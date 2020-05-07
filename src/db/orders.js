
export const orders = () => {
    const orders = [];
    orders.push({id:"123456-123456-1", name:"Web site mockup" ,date: new Date(2020,2,2,22,50)}); 
    orders.push({id:"123456-123456-2", name:"Fix CMS engine"  ,date: new Date(2020,2,4,16,5)});
    orders.push({id:"123456-123456-3", name:"Learn how to use react router" ,date: new Date(2020,2,10,7,22)});
    orders.push({id:"123456-123456-4", name:"Add new JS feature to opencard bucket" ,date: new Date(2020,2,2,22,50)});

    return orders;
}
