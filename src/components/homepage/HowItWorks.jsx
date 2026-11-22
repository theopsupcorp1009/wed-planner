import React from 'react';

const steps = [
    {
        title: 'Browse services',
        description: 'Search approved wedding vendors by category, location and price.',
    },
    {
        title: 'Send a request',
        description: 'Pick your event date and share what you need in a short message.',
    },
    {
        title: 'Get a reply',
        description: 'The vendor accepts or rejects, and you track it from your dashboard.',
    },
];

const HowItWorks = () => {
    return (
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <h2 className="mb-5 font-serif text-2xl font-medium tracking-tight text-stone-900 dark:text-stone-100 sm:text-3xl">
                How WedPlan works
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {steps.map((step, index) => (
                    <div
                        key={step.title}
                        className="rounded-xl border border-stone-200/80 bg-white p-5 dark:border-[#2d1e29] dark:bg-[#191117]"
                    >
                        <p className="font-serif text-2xl text-[#68324c] dark:text-[#e0a9c3]">
                            {index + 1}
                        </p>
                        <h3 className="mt-2 text-sm font-semibold text-stone-900 dark:text-stone-100">
                            {step.title}
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-stone-500 dark:text-stone-400">
                            {step.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;
