import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import {useRouteMatch, useParams, Switch, Route} from 'react-router-dom';

import Order from '../Order/Order';
import * as db from '../../../db/orders';

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

const Orders = () => {
    let match       = useRouteMatch();
    const orders    = db.orders();
    
    let {id} = useParams();
    if (id){id = id.slice(1)};
    console.log(id);

    return (
        <List component="nav" aria-label="Orders list">
            {orders.map(order=>{
                return (
                    <ListItem key={order.id} selected={id===order.id}>
                        <ListItemLink href={`${match.url}/:${order.id}`}>
                            <ListItemText primary={`Subject "${order.name}" date ${order.date.toDateString()}`} />
                        </ListItemLink>
                    </ListItem>);
            })}
        </List>
    );
};

const OrderList = (props) => {    
    let match = useRouteMatch();

    return (
        <div>
            <Orders/>
            <Switch>
                <Route path={`${match.url}/:id`} children={<Order />}/>
            </Switch>
        </div>
    );
};

export default OrderList;