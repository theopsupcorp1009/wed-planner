'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';

const BrowseServicesClient = ({ services = [], categories = [], initialCategory = '' }) => {
    const categoriesList = Array.isArray(categories) ? categories : [];
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [sortBy, setSortBy] = useState('asc');

    const locations = useMemo(() => {
        const unique = new Set(services.map((s) => s.location).filter(Boolean));
        return Array.from(unique);
    }, [services]);

    const filteredServices = useMemo(() => {
        return services
            .filter((service) => {
                const name = (service.serviceName || '').toLowerCase();
                const matchesSearch = name.includes(searchQuery.toLowerCase().trim());
                const matchesCategory = !selectedCategory || service.category === selectedCategory;
                const matchesLocation = !selectedLocation || service.location === selectedLocation;
                return matchesSearch && matchesCategory && matchesLocation;
            })
            .sort((a, b) => {
                const priceA = Number(a.price) || 0;
                const priceB = Number(b.price) || 0;
                return sortBy === 'asc' ? priceA - priceB : priceB - priceA;
            });
    }, [services, searchQuery, selectedCategory, selectedLocation, sortBy]);

    return (
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <h1 className="mb-6 font-serif text-3xl font-medium tracking-tight text-stone-900 dark:text-stone-100 sm:text-4xl">
                Browse wedding services
            </h1>

            <div className="mb-8 grid grid-cols-1 gap-4 rounded-2xl border border-stone-200/80 bg-white p-4 dark:border-[#2d1e29] dark:bg-[#191117] sm:grid-cols-2 lg:grid-cols-12">
                <div className="lg:col-span-5">
                    <label className="mb-1.5 block text-xs font-medium text-stone-600 dark:text-stone-300">
                        Search
                    </label>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name"
                        className="w-full rounded-lg border border-stone-200 bg-stone-50/60 px-3 py-2 text-xs text-stone-900 placeholder:text-stone-400 focus:border-[#68324c] focus:outline-none dark:border-[#2d1e29] dark:bg-[#130c11] dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-[#dfa4c0]"
                    />
                </div>

                <div className="lg:col-span-3">
                    <label className="mb-1.5 block text-xs font-medium text-stone-600 dark:text-stone-300">
                        Category
                    </label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full rounded-lg border border-stone-200 bg-stone-50/60 px-3 py-2 text-xs text-stone-900 focus:border-[#68324c] focus:outline-none dark:border-[#2d1e29] dark:bg-[#130c11] dark:text-stone-100 dark:focus:border-[#dfa4c0]"
                    >
                        <option value="">All categories</option>
                        {categoriesList.map((category, index) => {
                            const label = typeof category === 'string' ? category : category.name;
                            const key =
                                typeof category === 'string'
                                    ? category
                                    : category._id || category.slug || category.name || index;

                            return (
                                <option key={key} value={label}>
                                    {label}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <div className="lg:col-span-2">
                    <label className="mb-1.5 block text-xs font-medium text-stone-600 dark:text-stone-300">
                        Location
                    </label>
                    <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="w-full rounded-lg border border-stone-200 bg-stone-50/60 px-3 py-2 text-xs text-stone-900 focus:border-[#68324c] focus:outline-none dark:border-[#2d1e29] dark:bg-[#130c11] dark:text-stone-100 dark:focus:border-[#dfa4c0]"
                    >
                        <option value="">Anywhere</option>
                        {locations.map((location) => (
                            <option key={location} value={location}>
                                {location}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="lg:col-span-2">
                    <label className="mb-1.5 block text-xs font-medium text-stone-600 dark:text-stone-300">
                        Sort by price
                    </label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full rounded-lg border border-stone-200 bg-stone-50/60 px-3 py-2 text-xs text-stone-900 focus:border-[#68324c] focus:outline-none dark:border-[#2d1e29] dark:bg-[#130c11] dark:text-stone-100 dark:focus:border-[#dfa4c0]"
                    >
                        <option value="asc">Low to high</option>
                        <option value="desc">High to low</option>
                    </select>
                </div>
            </div>

            {filteredServices.length === 0 ? (
                <div className="rounded-2xl border border-stone-200/80 bg-white px-6 py-16 text-center dark:border-[#2d1e29] dark:bg-[#191117]">
                    <p className="font-serif text-lg text-stone-900 dark:text-stone-100">
                        No matching services found
                    </p>
                    <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                        Try adjusting your search or clearing active filters.
                    </p>
                    <button
                        type="button"
                        onClick={() => {
                            setSearchQuery('');
                            setSelectedCategory('');
                            setSelectedLocation('');
                            setSortBy('asc');
                        }}
                        className="mt-4 rounded-lg border border-stone-200 bg-white px-4 py-2 text-xs font-medium text-stone-700 transition duration-200 hover:border-[#68324c] hover:bg-[#68324c] hover:text-white dark:border-[#372532] dark:bg-[#22161f] dark:text-stone-200 dark:hover:border-[#dfa4c0] dark:hover:bg-[#dfa4c0] dark:hover:text-[#160f14]"
                    >
                        Reset Filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredServices.map((service) => {
                        const imageUrl = service.images?.[0] || '';
                        const vendorName = service.creatorName || 'Vendor Name';

                        return (
                            <div
                                key={service._id || service.serviceName}
                                className="group overflow-hidden rounded-2xl border border-stone-200/80 bg-white transition duration-200 hover:-translate-y-0.5 hover:border-[#68324c]/40 dark:border-[#2d1e29] dark:bg-[#191117] dark:hover:border-[#d89bb8]/40"
                            >
                                <div className="aspect-[16/10] w-full overflow-hidden bg-[#e7d6e0] dark:bg-[#2c1c26]">
                                    {imageUrl && (
                                        <img
                                            src={imageUrl}
                                            alt={service.serviceName}
                                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                        />
                                    )}
                                </div>
                                <div className="p-4">
                                    <span className="inline-block rounded-md bg-[#f5ebf0] px-2.5 py-0.5 text-[11px] font-medium text-[#68324c] dark:bg-[#2a1a24] dark:text-[#e0a9c3]">
                                        {service.category}
                                    </span>
                                    <h2 className="mt-2 font-serif text-lg font-medium text-stone-900 dark:text-stone-100">
                                        {service.serviceName}
                                    </h2>
                                    <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
                                        {service.location} · by {vendorName}
                                    </p>
                                    <div className="mt-4 flex items-center justify-between pt-1">
                                        <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                                            ৳{Number(service.price).toLocaleString()}
                                        </span>
                                        <Link
                                            href={`/services/${service._id}`}
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
            )}
        </section>
    );
};

export default BrowseServicesClient;