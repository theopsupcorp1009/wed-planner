import React from 'react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import ServiceDetailsClient from '@/components/others/ServiceDetails';
import BlankService from '@/components/others/BlankService';

const ServiceDetailsPage = async ({ params }) => {
    const { id } = await params;

    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
        redirect('/sign-in');
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/services/${id}`, {
        cache: 'no-store',
    });
    const text = await res.text();
    const service = text ? JSON.parse(text) : null;

    if (!res.ok || !service) {
        return <BlankService />;
    }

    return <ServiceDetailsClient service={service} />;
};

export default ServiceDetailsPage;
