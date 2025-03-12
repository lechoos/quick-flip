const Dot = () => <span className="inline-block w-[2.5rem] aspect-square rounded-full bg-red-500 border-[3px] border-black shadow-[3px_3px_0_#000]" />;

export default function DecoPage() {
  return (
    <div className="flex items-center min-h-screen">
      <div className="inline-flex justify-center gap-x-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <Dot key={i} />
        ))}
      </div>
    </div>
  );
}
