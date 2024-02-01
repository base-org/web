import React from 'react';
import Layout from '@theme/Layout';

import StudentProgress from '../../components/StudentProgress/index';

export default function Hello() {
  return (
    <Layout title="Progress">
      <StudentProgress />
    </Layout>
  );
}
