import "../styles/toc.css";

export function Toc({ items }: { items: { level: string; content: string }[] }) {
  return (
    <aside className={"toc hidden xl:block sticky top-[50px] bottom-0 w-[250px]"}>
      <ul>
        {items
          .filter((item) => Number(item.level) <= 3)
          .map((item, index) => (
            <li key={index} className={"-level-" + item.level}>
              <a href={`#${item.content}`}>{item.content}</a>
            </li>
          ))}
      </ul>
    </aside>
  );
}
