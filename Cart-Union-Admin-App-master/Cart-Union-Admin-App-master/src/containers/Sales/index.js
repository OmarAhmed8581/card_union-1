import React, { useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout";
import "./style.css";
/**
 * @author
 * @function Sales
 **/

export const Sales = (props) => {
    const order = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);
    const product = useSelector((state) => state.product);
    const auth = useSelector((state) => state.auth);

    

  
    
    // Use if statement to conditionally render
    if (auth.user.email != "muhammadhamza11@gmail.com") {

      if(order!=[]){


        var seller_id= auth['user']['_id'];
        console.log(seller_id)


        console.log(order['orders'])
        console.log(product)
        var product_dict={}
        for (const orderItem of order['orders']) {
          const { items, orderStatus} = orderItem;
          
          if (orderStatus[3]['isCompleted']) {
            for (const item of items) {
              
              var { productId, payablePrice , sellerId } = item;
              if(sellerId == seller_id){
                for (const productItem of product['products']) {
                  const { _id, name } = productItem;
                  // console.log(productId)
                  if(productId!=null){

                    // console.log(productId['_id'])
                    // console.log(productId['_id'])
                    if (_id === productId['_id']) {
                      
                      if (name in product_dict){
                        product_dict[name][0]+=1
                        product_dict[name][1]+=payablePrice
                        console.log(product_dict[name])
                      }
                      else{
                        var temp=[]
                        temp.push(1)
                        temp.push(payablePrice)
                        product_dict[name]=temp
                      }
                      break
                    }
                  }
                }
              }
            }
          
          }
        }
        console.log('product_dict')
        console.log(product_dict)
    }



      return (
        <Layout sidebar>
          <Container>
            <Row>
              <Col md={12}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <h1>Sales</h1>
                </div>
              </Col>
            </Row>

            <Table style={{ fontSize: 12 }} responsive="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Total Sales</th>
                    <th>Total Amount</th>
                </tr>
                </thead>
                <tbody>

                {Object.keys(product_dict).map((productName, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{productName}</td>
                    <td>{product_dict[productName][0]}</td>
                    <td>{product_dict[productName][1]}</td>
                  </tr>
                ))}



                </tbody>
            </Table>

          </Container>
        </Layout>
      );
    } else {

      console.log(order)
      console.log(product)
      console.log(user)
      
      var userdata = user['users']
      var product_dict={}


      for (const orderItem of order['orders']) {
        const { items, orderStatus ,user } = orderItem;
        if (orderStatus[3]['isCompleted']==true) {
          // alert(orderStatus[3]['isCompleted'])
          var firstName="";
          var lastName="";
          console.log(items)
          for(var i=0;i<userdata.length;i++){
            if(userdata[i]['_id']==user){
              firstName = userdata[i]['firstName']
              lastName = userdata[i]['lastName']

              var username = firstName+" "+lastName

              if(username in product_dict){
                
              }
              else{
                product_dict[username]={}
              } 
              break;
            }
          }

          if(firstName!="" && lastName!=""){   
           
            for (const item of items) {
              const { productId, payablePrice,sellerId } = item;
              for (const productItem of product['products']) {
                const { _id, name } = productItem;
                if (_id === productItem['_id']) {
                  
                  if (name in product_dict[firstName+" "+lastName]){
                      
                      product_dict[firstName+" "+lastName][name][0]+=1
                      product_dict[firstName+" "+lastName][name][1]+=item['payablePrice']
                  
                  }
                  else{
                      var temp=[]
                      temp.push(1)
                      temp.push(item['payablePrice'])
                      product_dict[firstName+" "+lastName][name]=temp
                    
                  }
                  break;
                }
              }
            }
          }
        }
      }

      console.log(product_dict)


     

      
      return (
        <Layout sidebar>
          <Container>
            <Row>
              <Col md={12}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <h1>Sales</h1>
                </div>
              </Col>
            </Row>

            <Table style={{ fontSize: 12 }} responsive="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Seller Name</th>
                    <th>Product Name</th>
                    <th>Total Sales</th>
                    <th>Total Amount</th>
                </tr>
                </thead>
                <tbody>
                {
                  (() => {
                    let rowCount = 1; // Initialize counter for row numbers
                    const rows = [];

                    Object.keys(product_dict).forEach((sellerName) =>
                      Object.keys(product_dict[sellerName]).forEach((productName) => {
                        const [salesCount, totalAmount] = product_dict[sellerName][productName];

                        const row = (
                          <tr key={rowCount}>
                            <td>{rowCount}</td>
                            <td>{sellerName}</td>
                            <td>{productName}</td>
                            <td>{salesCount}</td>
                            <td>{totalAmount}</td>
                          </tr>
                        );

                        rows.push(row);
                        rowCount++; // Increment the counter for the next row
                      })
                    );

                    return rows;
                  })()
                  }
                </tbody>
            </Table>

          </Container>
        </Layout>
      );

      // // Return something else if the condition is not met
      // return <p>You don't have access to the Sales page.</p>;

    }
};