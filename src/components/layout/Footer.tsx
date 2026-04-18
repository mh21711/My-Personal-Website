import en from "@/messages/en.json";
import ar from "@/messages/ar.json";

interface FooterProps {
    isRtl?: boolean;
}

function Footer({ isRtl }: FooterProps) {
    const t = isRtl ? ar.landingpage.footer : en.landingpage.footer;

    return (
        <footer className="border-t border-footer-border bg-footer">
            <div className="container mx-auto px-4 py-4">
                <p className="mb-2 text-sm text-center text-text-secondary">
                    &copy; {new Date().getFullYear()} {t.copyright}
                </p>
                <p className="text-center text-text-secondary">
                    {t.designed}
                </p>
            </div>
        </footer>
    );
}

export default Footer;