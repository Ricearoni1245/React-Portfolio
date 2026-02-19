// =====================================


export function Placeholder({ title }: { title: string }) {
return (
<div className="mx-auto max-w-7xl px-4 py-24">
<h3 className="mb-6 text-3xl font-bold text-text">{title}</h3>
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
{Array.from({ length: 6 }).map((_, i) => (
<div key={i} className="rounded-xl border border-secondary bg-secondary/30 p-6 text-text/85">
Card {i + 1}
</div>
))}
</div>
</div>
);
}
