export default function Footer() {
  return (
    <footer className="footer">
      <div className="container-fluid container">
        <div className="footer__bottom text--center">© {new Date().getFullYear()} Coinbase</div>
      </div>
    </footer>
  );
}
