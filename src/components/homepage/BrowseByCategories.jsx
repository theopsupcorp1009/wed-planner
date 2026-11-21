import React from 'react';
import Link from 'next/link';

const BrowseByCategories = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/categories`, {
        cache: 'no-store',
    });
    const categories = await res.json();

    return (
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <h2 className="mb-5 font-serif text-2xl font-medium tracking-tight text-stone-900 dark:text-stone-100 sm:text-3xl">
                Browse by category
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => {
                    const name = typeof category === 'string' ? category : category.name;
                    const slug =
                        typeof category === 'string'
                            ? encodeURIComponent(category)
                            : encodeURIComponent(category.slug || category.name);

                    return (
                        <Link
                            key={name}
                            href={`/services?category=${slug}`}
                            className="group rounded-xl border border-stone-200/80 bg-white px-5 py-4 transition duration-200 hover:-translate-y-0.5 hover:border-[#68324c]/50 hover:bg-[#f7eef3]/50 dark:border-[#2d1e29] dark:bg-[#191117] dark:hover:border-[#d89bb8]/50 dark:hover:bg-[#241721]"
                        >
                            <p className="text-sm font-medium text-stone-900 transition-colors group-hover:text-[#68324c] dark:text-stone-100 dark:group-hover:text-[#e6b3ca]">
                                {name}
                            </p>
                            <p className="mt-1 text-xs text-stone-500 transition-colors group-hover:text-stone-700 dark:text-stone-400 dark:group-hover:text-stone-300">
                                Explore services
                            </p>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default BrowseByCategories;