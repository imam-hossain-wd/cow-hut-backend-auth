import express from 'express';
import userRoutes from '../modules/users/user.route'
import cowRoutes from '../modules/cow/cow.route'
import orderRoutes from '../modules/orders/order.route'
import adminRoues from '../modules/admin/admin.router'

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: userRoutes
  },
  {
    path: '/users',
    route: userRoutes
  },
  
  {
    path: '/cows',
    route: cowRoutes
  },
  {
    path: '/orders',
    route: orderRoutes
  },
  {
    path: '/auth',
    route: adminRoues
  },

];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;