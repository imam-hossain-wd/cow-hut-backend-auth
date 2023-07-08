import {Types } from 'mongoose';

type IOrder = {
  cow: Types.ObjectId;
  buyer: Types.ObjectId;

}


export default IOrder;