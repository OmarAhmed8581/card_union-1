import React, { useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
// import Modal from "../../components/UI/Modal";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "./style.css";
/**
 * @author
 * @function Sales
 **/

export const Refunds = (props) => {
    const order = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);
    const product = useSelector((state) => state.product);
    const auth = useSelector((state) => state.auth);
    const [show, setShow] = useState(false);
    const [tableData, setTableData] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    console.log(order)

    

    

    

  
    
    // Use if statement to conditionally render
    if (auth.user.email != "muhammadhamza11@gmail.com") {

      if(order!=[]){


        var seller_id= auth['user']['_id'];
        console.log(seller_id)


        // console.log(order['orders'])
        // console.log(product)
        var product_dict={}
        var refund_dict={}

      


        for (const orderItem of order['orders']) {
          const { items, orderStatus} = orderItem;
          
            for (const item of items) {
              
              var { productId, payablePrice , sellerId ,returnItem,buyername } = item;
              if(returnItem != ""){
                if(sellerId == seller_id){

                    for (const productItem of product['products']) {
                    const { _id, name ,} = productItem;
                    // console.log(productId)
                    if(productId!=null){

                      
                        if (_id === productId['_id']) {

                        if (name in refund_dict){
                          var t = []
                          t.push(returnItem)
                          t.push(buyername)
                          refund_dict[name].push(t)
                      
                        }
                        else{
                          refund_dict[name]=[]
                          var t = []
                          t.push(returnItem)
                          t.push(buyername)
                          refund_dict[name].push(t)
                        }
                        
                        
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
        console.log(refund_dict)
    }
    const onRefund = (item)=>{
        
      console.log(refund_dict[item])
      setTableData(refund_dict[item])
      setShow(true)
    
    }


      return (

        
        <Layout sidebar>
          
      
          <Container>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Refund</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Table style={{ fontSize: 12 }} responsive="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Buyer Name</th>
                    <th>Refund Message</th>
                    
                </tr>
                </thead>
                <tbody id="table1">
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{row[1] !== "" ? row[1] : 'unknown'}</td>
                      <td>{row[0]}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
            <Row>
              <Col md={12}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <h1>Refund</h1>
                </div>
              </Col>
            </Row>

            <Table style={{ fontSize: 12 }} responsive="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Total Refund</th>
                    <th>Total Amount</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>

                {Object.keys(product_dict).map((productName, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{productName}</td>
                    <td>{product_dict[productName][0]}</td>
                    <td>{product_dict[productName][1]}</td>
                    <td>
                    <button
                        class="form-control-sm"
                        style={{
                          cursor: "pointer",
                          width: "50%",
                          margin: "5px",
                          fontWeight: "bold",
                          backgroundColor: "rgb(7, 31, 69)",
                          fontSize: "10px",
                          borderRadius: "5px",
                          color: "whitesmoke",
                        }}
                        onClick={() => onRefund(productName)}
                  
                      >
                        View Refund
                      </button>
                    </td>
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
      var refund_dict={}

      const onRefund = (name,item)=>{
        // alert(name)
        // alert(item)
        console.log(refund_dict[name][item])
        setTableData(refund_dict[name][item])
        setShow(true)
      
      }
      
      for (const orderItem of order['orders']) {
        const { items, orderStatus ,user } = orderItem;
        
          // alert(orderStatus[3]['isCompleted'])
          var firstName="";
          var lastName="";
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

              if(username in refund_dict){
                
              }
              else{
                refund_dict[username]={}
                
              } 
              break;
            }
          }
          if(firstName!="" && lastName!=""){    
            console.log('items')
            console.log(items)    
            for (const item of items) {
              const { productId, payablePrice , returnItem , buyername } = item;
              if(returnItem != "" && productId!=null){
                console.log('returnItem')
                console.log(returnItem)
                console.log(item)
                console.log(item['_id'])
                console.log(product['products'])
                for (const productItem of product['products']) {
                    const { _id, name } = productItem;
                    // alert(productId['_id'])
                    if (productId['_id'] == productItem['_id']) {
                        console.log('product name')
                        console.log(name)
                        console.log(refund_dict)

                        if (name in refund_dict[firstName+" "+lastName]){
                          var t = []
                          t.push(returnItem)
                          t.push(buyername)
                          refund_dict[firstName+" "+lastName][name].push(t)
                       
                        }
                        else{
                          refund_dict[firstName+" "+lastName][name]=[]
                          var t = []
                          t.push(returnItem)
                          t.push(buyername)
                          refund_dict[firstName+" "+lastName][name].push(t)
                        }

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

      console.log(refund_dict)




     

      
      return (
        <Layout sidebar>
        
          <Container>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Refund</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Table style={{ fontSize: 12 }} responsive="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Buyer Name</th>
                    <th>Refund Message</th>
                </tr>
                </thead>
                <tbody id="table1">
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{row[1] !== "" ? row[1] : 'unknown'}</td>
                      <td>{row[0]}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
            <Row>
              <Col md={12}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <h1>Refund</h1>
                </div>
              </Col>
            </Row>

            <Table style={{ fontSize: 12 }} responsive="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Seller Name</th>
                    <th>Product Name</th>
                    <th>Total Refund</th>
                    <th>Total Amount</th>
                    <th>Actions</th>
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
                            <td>
                            <button
                                class="form-control-sm"
                               
                                style={{
                                  cursor: "pointer",
                                  width: "100%",
                                  margin: "5px",
                                  fontWeight: "bold",
                                  backgroundColor: "rgb(7, 31, 69)",
                                  fontSize: "10px",
                                  borderRadius: "5px",
                                  color: "whitesmoke",
                                }}
                                // onClick={() => handleShow()}

                                onClick={() => onRefund(sellerName,productName)}
                              >
                                View Refund
                              </button>
                            </td>
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

      // // Refund something else if the condition is not met
      // return <p>You don't have access to the Sales page.</p>;

    }
};


