import React from 'react';
import Link from 'next/link';
import ServiceDetailsClient from '@/components/others/ServiceDetails';
import BlankService from '@/components/others/BlankService';

const ServiceDetailsPage = async ({ params }) => {
    const { id } = await params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/services/${id}`, {
        cache: 'no-store',
    });

    if (!res.ok) {
        return <><BlankService/></>
    }

    const data = await res.json();
    const service = data.service || data;

    return <ServiceDetailsClient service={service} />;
};

export default ServiceDetailsPage;