"use client";

import React, { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import type { AdminSection } from '../../components/admin/AdminLayout';
import { Dashboard } from '../../components/admin/Dashboard';
import { ProductManager } from '../../components/admin/ProductManager';
import { CategoryManager } from '../../components/admin/CategoryManager';

export function Admin() {
  const [section, setSection] = useState<AdminSection>('dashboard');
  const [initialDivision, setInitialDivision] = useState<any>('acrylic-sheets');

  const handleNavigate = (targetSection: AdminSection, targetDivision?: string) => {
    if (targetDivision) {
      setInitialDivision(targetDivision);
    }
    setSection(targetSection);
  };

  return (
    <AdminLayout section={section} onSectionChange={setSection}>
      {section === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
      {section === 'products' && <ProductManager initialDivision={initialDivision} />}
      {(section === 'categories-collections' || section === 'categories' || section === 'collections') && (
        <CategoryManager />
      )}
    </AdminLayout>
  );
}