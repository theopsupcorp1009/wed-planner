import BrowseServicesClient from '@/components/others/BrowseServicesClient';
import React from 'react';

const BrowseServicePage = async ({ searchParams }) => {
    const resolvedSearchParams = await searchParams;

    const categoryRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/categories`, {
        cache: 'no-store',
    });
    const categoryData = await categoryRes.json();
    const categories = Array.isArray(categoryData) ? categoryData : categoryData.categories || [];

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/services`, {
        cache: 'no-store',
    });
    const data = await res.json();
    const services = Array.isArray(data) ? data : data.services || [];

    const approvedServices = services.filter(
        (service) => service.status === 'approved' && service.isActive !== false
    );

    const rawParam = resolvedSearchParams?.category || '';
    const matchedCategory = categories.find(
        (c) => (typeof c === 'string' ? c : c.name) === rawParam || c.slug === rawParam
    );
    const initialCategory = matchedCategory
        ? typeof matchedCategory === 'string'
            ? matchedCategory
            : matchedCategory.name
        : rawParam;

    return (
        <BrowseServicesClient
            services={approvedServices}
            categories={categories}
            initialCategory={initialCategory}
        />
    );
};

export default BrowseServicePage;