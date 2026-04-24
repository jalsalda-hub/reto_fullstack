import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import { MainLayout } from '../components/templates/MainLayout';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default AppRouter;
