export function SimplePage({ title, text }: { title: string; text: string }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-serif text-3xl font-semibold">{title}</h1>
      <p className="mt-4 text-lg text-slate-600">{text}</p>
    </div>
  );
}
