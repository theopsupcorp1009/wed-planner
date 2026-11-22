import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(process.env.MONGODB_DB);

export const auth = betterAuth({
    database: mongodbAdapter(db),
    baseURL: process.env.BETTER_AUTH_URL,
    trustedOrigins: [
        "http://localhost:3000",
        "https://wedplan-ten.vercel.app",
    ],
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 6,
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "customer",
                input: false,
            },
            isBlocked: {
                type: "boolean",
                required: false,
                defaultValue: false,
                input: false,
            },
            subscriptionPlan: {
                type: "string",
                required: false,
                defaultValue: "free",
                input: false,
            },
            premium: {
                type: "boolean",
                required: false,
                defaultValue: false,
                input: false,
            },
            subscriptionExpiresAt: {
                type: "date",
                required: false,
                input: false,
            },
            businessName: {
                type: "string",
                required: false,
                input: true,
            },
        },
    },
    databaseHooks: {
        user: {
            create: {
                before: async (user, context) => {
                    const role = context?.body?.role === "vendor" ? "vendor" : "customer";
                    return { data: { ...user, role } };
                },
            },
        },
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },
});
