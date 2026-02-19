import type { PropsWithChildren } from "react";


export function Section({ id, children }: PropsWithChildren<{ id: string }>) {
return (
<section id={id} className="scroll-mt-24">
{children}
</section>
);
}
