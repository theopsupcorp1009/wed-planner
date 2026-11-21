import React from 'react';

const features = [
    {
        title: 'Approved vendors only',
        description: 'Every service is reviewed by our team before it appears.',
    },
    {
        title: 'One place to track',
        description: 'See each booking request move from pending to confirmed.',
    },
    {
        title: 'Fair and transparent',
        description: 'Clear prices, no hidden fees, secure payments.',
    },
];

const WhyChooseWedPlan = () => {
    return (
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <h2 className="mb-5 font-serif text-2xl font-medium tracking-tight text-stone-900 dark:text-stone-100 sm:text-3xl">
                Why choose WedPlan?
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {features.map((item) => (
                    <div
                        key={item.title}
                        className="rounded-xl border border-stone-200/80 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[#68324c]/40 dark:border-[#2d1e29] dark:bg-[#191117] dark:hover:border-[#d89bb8]/40"
                    >
                        <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                            {item.title}
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-stone-500 dark:text-stone-400">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhyChooseWedPlan;