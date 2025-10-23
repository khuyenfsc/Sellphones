import React from "react";
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Cột 1 - Giới thiệu */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">SellPhones</h3>
          <p className="text-sm leading-relaxed">
            Cửa hàng điện thoại hàng đầu Việt Nam – chuyên cung cấp điện thoại
            chính hãng, giá tốt, dịch vụ tận tâm và bảo hành uy tín.
          </p>
        </div>

        {/* Cột 2 - Hỗ trợ khách hàng */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hỗ trợ khách hàng</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-black transition">Chính sách bảo hành</a></li>
            <li><a href="#" className="hover:text-black transition">Chính sách đổi trả</a></li>
            <li><a href="#" className="hover:text-black transition">Hướng dẫn mua hàng</a></li>
            <li><a href="#" className="hover:text-black transition">Câu hỏi thường gặp</a></li>
          </ul>
        </div>

        {/* Cột 3 - Liên hệ */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Liên hệ</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-600" />
              123 Nguyễn Trãi, Hà Nội
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-600" />
              <a href="tel:0123456789" className="hover:text-black transition">0123 456 789</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-600" />
              <a href="mailto:support@sellphones.vn" className="hover:text-black transition">
                support@sellphones.vn
              </a>
            </li>
          </ul>
        </div>

        {/* Cột 4 - Mạng xã hội */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Kết nối với chúng tôi</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-600 transition">
              <Facebook />
            </a>
            <a href="#" className="hover:text-pink-500 transition">
              <Instagram />
            </a>
            <a href="#" className="hover:text-sky-500 transition">
              <Twitter />
            </a>
          </div>
        </div>
      </div>

      {/* Dòng bản quyền */}
      <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="text-gray-800 font-semibold">SellPhones</span>. 
        All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
