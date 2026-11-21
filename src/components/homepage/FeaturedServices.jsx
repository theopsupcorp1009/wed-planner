import React from 'react';
import Link from 'next/link';

const FeaturedServices = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/services`, {
        cache: 'no-store',
    });
    const data = await res.json();
    const allServices = Array.isArray(data) ? data : data.services || [];
    const services = allServices
        .filter((service) => service.status === 'approved' && service.isActive !== false)
        .sort((a, b) => (b.purchaseCount || 0) - (a.purchaseCount || 0))
        .slice(0, 6);
    return (
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <h2 className="mb-5 font-serif text-2xl font-medium tracking-tight text-stone-900 dark:text-stone-100 sm:text-3xl">
                Featured services
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {services.slice(0, 6).map((service) => {
                    const imageUrl =
                        service.images?.[0] || service.image || '';
                    const vendorName =
                        service.vendorName || service.businessName || service.vendor?.name || 'Vendor Name';

                    return (
                        <div
                            key={service._id || service.id}
                            className="group overflow-hidden rounded-2xl border border-stone-200/80 bg-white transition duration-200 hover:-translate-y-0.5 hover:border-[#68324c]/40 dark:border-[#2d1e29] dark:bg-[#191117] dark:hover:border-[#d89bb8]/40"
                        >
                            <div className="aspect-[16/10] w-full overflow-hidden bg-[#e7d6e0] dark:bg-[#2c1c26]">
                                {imageUrl && (
                                    <img
                                        src={imageUrl}
                                        alt={service.serviceName || service.name}
                                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                    />
                                )}
                            </div>
                            <div className="p-4">
                                <span className="inline-block rounded-md bg-[#f5ebf0] px-2.5 py-0.5 text-[11px] font-medium text-[#68324c] dark:bg-[#2a1a24] dark:text-[#e0a9c3]">
                                    {service.category}
                                </span>
                                <h3 className="mt-2 font-serif text-lg font-medium text-stone-900 dark:text-stone-100">
                                    {service.serviceName || service.name}
                                </h3>
                                <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
                                    {service.location} · by {vendorName}
                                </p>
                                <div className="mt-4 flex items-center justify-between pt-1">
                                    <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                                        ${Number(service.price).toLocaleString()}
                                        {service.priceUnit ? ` / ${service.priceUnit}` : ''}
                                    </span>
                                    <Link
                                        href={`/services/${service._id || service.id}`}
                                        className="rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-700 transition duration-200 hover:border-[#68324c] hover:bg-[#68324c] hover:text-white dark:border-[#372532] dark:bg-[#22161f] dark:text-stone-200 dark:hover:border-[#dfa4c0] dark:hover:bg-[#dfa4c0] dark:hover:text-[#160f14]"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default FeaturedServices;