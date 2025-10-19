// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Twitter, Instagram, Facebook } from 'lucide-react';
// import { ArabicTentIcon } from '@/components/ui/ArabicTentIcon';
// const Footer = () => {
//   return <footer className="bg-secondary text-secondary-foreground">
//       <div className="container py-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           <div className="flex flex-col items-start">
//             <Link to="/" className="flex items-center gap-2 mb-4">
//               <ArabicTentIcon className="h-10 w-10 text-primary" />
//               <span className="font-bold text-2xl">Camply</span>
//             </Link>
//             <p className="text-muted-foreground text-sm">منصتك الأولى لاستكشاف وحجز أفضل المخيمات في عُمان</p>
//           </div>
//           <div>
//             <p className="font-bold mb-4">روابط سريعة</p>
//             <ul className="space-y-2">
//               <li><Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">الرئيسية</Link></li>
//               <li><Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">من نحن</Link></li>
//               <li><Link to="/join" className="text-sm text-muted-foreground hover:text-primary transition-colors">انضم إلينا</Link></li>
//               <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">اتصل بنا</Link></li>
//             </ul>
//           </div>
//           <div>
//             <p className="font-bold mb-4">سياسة الخصوصية والشروط والأحكام</p>
//             <ul className="space-y-2">
//               <li><Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">سياسة الخصوصية</Link></li>
//               <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">شروط الخدمة</Link></li>
//             </ul>
//           </div>
//           <div>
//             <p className="font-bold mb-4">تابعنا</p>
//             <div className="flex gap-4">
//               <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter /></a>
//               <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram /></a>
//               <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook /></a>
//             </div>
//           </div>
//         </div>
//         <div className="mt-12 border-t border-border pt-8 text-center">
//           <p className="text-sm text-muted-foreground">
//             &copy; {new Date().getFullYear()} Camply. جميع الحقوق محفوظة.
//           </p>
//         </div>
//       </div>
//     </footer>;
// };
// export default Footer;



























import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Facebook } from 'lucide-react';
import { ArabicTentIcon } from '@/components/ui/ArabicTentIcon';

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-start">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <ArabicTentIcon className="h-10 w-10 text-primary" />
              <span className="font-bold text-2xl">Camply</span>
            </Link>
            <p className="text-muted-foreground text-sm">منصتك الأولى لاستكشاف وحجز أفضل المخيمات في عُمان</p>
          </div>
          <div>
            <p className="font-bold mb-4">روابط سريعة</p>
            <ul className="space-y-2">
              <li><Link to="/home" className="text-sm text-muted-foreground hover:text-primary transition-colors">الرئيسية</Link></li>
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">من نحن</Link></li>
              <li><Link to="/join" className="text-sm text-muted-foreground hover:text-primary transition-colors">انضم إلينا</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">اتصل بنا</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-bold mb-4">سياسة الخصوصية والشروط والأحكام</p>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">سياسة الخصوصية</Link></li>
              <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">شروط الخدمة</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-bold mb-4">تابعنا</p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter"><Twitter /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram"><Instagram /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook"><Facebook /></a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Camply. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
