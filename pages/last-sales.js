import { useEffect, useState } from "react";
import useSWR from 'swr';

function LastSalesPage(){
    const [sales, setSales] = useState();
    // const [isLoading, setIsLoading] = useState(false);
    const transformedSales = [];

    const { data, error } = useSWR(
        'https://nextjs-fetchingdata-default-rtdb.firebaseio.com/test.json',
        (url) => fetch(url).then(res => res.json())
    );
    
    useEffect(() => {
        
        // for (const key in data){
        //     transformedSales.push({
        //         id: key, 
        //         username: data[key].username, 
        //         volume: data[key].volume,
        //     });
        // }

        for (let key in data){
            transformedSales.push({
                id: key,
                value: data[key].number,
            })
        }

        setSales(transformedSales);
    }

    , [data]);
    // useEffect(()=>{
    //     fetch('https://nextjs-fetchingdata-default-rtdb.firebaseio.com/sales.json'
    //     ).then((response)=>response.json()
    //     ).then(data=>{
    //         const transformedSales = [];

    //         for (const key in data){
    //             transformedSales.push({
    //                 id: key, 
    //                 username: data[key].username, 
    //                 volume: data[key].volume,
    //             });
    //         }
            
    //         setSales(transformedSales);
    //         setIsLoading(false);
    //     });
    // }, []);
    
    if(error){
        return `${error}`;
    }

    if(!data || !sales){
        return <p>Loading...</p>;
    }

    return (
        console.log(data),
        <div>
            <ul>
                {sales.map(sale => 
                <li key={sale.id}>
                    ${sale.value}
                </li>)}
            </ul>
        </div>
    );
}

export default LastSalesPage;