import React from 'react';
import Link from 'next/link';
import ServiceDetailsClient from '@/components/others/ServiceDetails';

const ServiceDetailsPage = async ({ params }) => {
    const { id } = await params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/services/${id}`, {
        cache: 'no-store',
    });

    if (!res.ok) {
        return (
            <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
                <h1 className="font-serif text-2xl font-medium text-stone-900 dark:text-stone-100">
                    Service not found
                </h1>
                <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
                    The requested service ID is invalid or no longer available.
                </p>
                <Link
                    href="/services"
                    className="mt-5 inline-block rounded-lg border border-stone-200 bg-white px-4 py-2 text-xs font-medium text-stone-700 transition duration-200 hover:border-[#68324c] hover:bg-[#68324c] hover:text-white dark:border-[#372532] dark:bg-[#22161f] dark:text-stone-200 dark:hover:border-[#dfa4c0] dark:hover:bg-[#dfa4c0] dark:hover:text-[#160f14]"
                >
                    Back to Services
                </Link>
            </section>
        );
    }

    const data = await res.json();
    const service = data.service || data;

    return <ServiceDetailsClient service={service} />;
};

export default ServiceDetailsPage;