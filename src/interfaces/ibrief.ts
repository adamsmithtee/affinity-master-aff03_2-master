import {IOffer} from './ioffer';
import {IMerchant} from './imerchant';
import {IGroup} from './igroup';
import {IEvent} from './ievent';

export interface IBrief{
  offers : IOffer[];
  merchants : IMerchant[];
  groups : IGroup[];
  events : IEvent[];
}