export default function StatusPageView() {
  return (
    <main>
      <iframe
        style={{ height: "calc(100vh - 4rem)" }}
        className="w-full"
        src="https://status.api.clubmed/"
        title="ClubMed API Status Page"
      />
    </main>
  );
}
