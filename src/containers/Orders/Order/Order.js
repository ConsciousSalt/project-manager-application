import React from 'react';

import {useParams} from 'react-router-dom';

import * as db from '../../../db/orders';

const Order = (props) => {
    let {id} = useParams();
    id = id.slice(1);
    
    const orders = db.orders();
    const order = orders.find(order => order.id === id);
    console.log(orders);
    let OrderPresentation = <div>Order not found! {id}</div>

    if (order) {
        OrderPresentation = (        
                <div>
                    <h2>
                        {order.name}
                    </h2>
                    <h3>
                        {order.date.toDateString()}
                    </h3>
                </div>
            );
    }

    return OrderPresentation;
}

export default Order;