import React, { useState , useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout";
import "./style.css";

export const Statistical = () => {

  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const product = useSelector((state) => state.product);
  const auth = useSelector((state) => state.auth);

 

  const months = ['jan', 'Feb', 'Mar', 'April', 'May', 'Jun', 'July', 'August', 'Sept', 'Oct', 'Nov', 'Dec'];
  var total_sales = {
    'jan': 0, 'Feb': 0, 'Mar': 0, 'April': 0, 'May': 0, 'Jun': 0, 'July': 0, 'August': 0, 'Sept': 0, 'Oct': 0, 'Nov': 0, 'Dec': 0
  };
  let newdata = []
  let product_dict={}
  let user_dict={}
  let flat=false
  
  if (auth.user.email != "muhammadhamza11@gmail.com") {
    if (order != []) {
      var seller_id = auth.user._id;
      console.log(seller_id);
      console.log(order);
  
      for (const orderItem of order.orders) {
        const { items, orderStatus } = orderItem;
  
        if (orderStatus[3].isCompleted) {
          for (const item of items) {
            var { productId, payablePrice, sellerId } = item;
            if (sellerId == seller_id) {
              const dateString = orderStatus[3].date;
              const date = new Date(dateString);
              const month = months[date.getMonth()];
              total_sales[month] += 1;
              flat=true
              for (const productItem of product['products']) {
                const { _id, name } = productItem;
              
                if(productId!=null){

                  if (_id === productId['_id']) {

                    var n = name.split('(')
                    console.log(n)
                    if (n[0] in product_dict){
                      product_dict[n[0]]+=1
                    }
                    else{
                      product_dict[n[0]]=1
                    }
                    break
                  }
                  
                }
              }
              
            }
          }
        }
      }
    }
  }

  else{

    var userdata = user['users']
    for (const orderItem of order['orders']) {
      const { items, orderStatus ,user } = orderItem;
      if (orderStatus[3]['isCompleted']==true) {
        // alert(orderStatus[3]['isCompleted'])
        var firstName="";
        var lastName="";
        for(var i=0;i<userdata.length;i++){
          if(userdata[i]['_id']==user){
            firstName = userdata[i]['firstName']
            lastName = userdata[i]['lastName']

            var username = firstName+" "+lastName

            if(username in user_dict){
              
            }
            else{
              user_dict[username]=0
            } 
            break;
          }
        }

        if(firstName!="" && lastName!=""){        
          for (const item of items) {
            const { productId, payablePrice } = item;
            const dateString = orderStatus[3].date;
            const date = new Date(dateString);
            const month = months[date.getMonth()];
            total_sales[month] += 1;
            if (productId!=null){

              
              for (const productItem of product['products']) {
                const { _id, name } = productItem;
               
                  user_dict[firstName+" "+lastName] +=1
                  // if (name in user_dict[firstName+" "+lastName]){
                  //   user_dict[firstName+" "+lastName] +=1
                  // }
                  // else{
                  //   user_dict[firstName+" "+lastName]=1
                  // }

                  if (_id == productId['_id']) {

                    var n = name.split('(')
                    console.log(n)
                    if (n[0] in product_dict){
                      product_dict[n[0]]+=1
                    }
                    else{
                      product_dict[n[0]]=1
                    }
                    break
                  }

              }
            }
          }
        }
      }
    }
  }

  console.log(product_dict);
  console.log(total_sales);
  console.log(newdata);
  
  var titleTooltip = (tooltipItems) => {
    return '';
  };
  const [data, setData] = useState({
    labels:  Object.keys(total_sales),
    datasets: [
      {
        label: 'Total Sales',
        data:  Object.values(total_sales),
        backgroundColor: document.body.className === 'dark-theme' ? '#2e2d2d' : '#dcdedf',
        borderWidth: 0,
        barPercentage: 0.6,
        borderRadius: 3,
      },
      
    ],
  });

  const [productdata, setproductdata] = useState({
    labels: Object.keys(product_dict),
    datasets: [
      {
        label: 'Total Product',
        data: Object.values(product_dict),
        backgroundColor: document.body.className === 'dark-theme' ? '#2e2d2d' : '#dcdedf',
        borderWidth: 0,
        barPercentage: 0.6,
        borderRadius: 3,
      },
      
    ],
  });


  const [userdata1, setuserdata] = useState({
    labels: Object.keys(user_dict),
    datasets: [
      {
        label: 'Total Sellar',
        data: Object.values(user_dict),
        backgroundColor: document.body.className === 'dark-theme' ? '#2e2d2d' : '#dcdedf',
        borderWidth: 0,
        barPercentage: 0.6,
        borderRadius: 3,
      },
      
    ],
  });
  
  const [options, setOptions] = useState({
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000 * 1.5,
      easing: 'easeInSine',
    },
    plugins: {
      datalabels: {
        display: false,
      },
      legend: {
        display: true,
      },
      tooltip: {
        yAlign: 'bottom',
        displayColors: false,
        callbacks: {
          title: titleTooltip,
        },
      },
    },
    scales: {
      x: {
        stacked: true,

        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        min: 0,
        beginAtZero: true,
        ticks: {
          display: false,
        },
        padding: {
          top: 50,
        },

        grid: {
          display: false,
          drawOnChartArea: false,
          drawTicks: false,
          border: false,
          drawBorder: false,
        },
      },
    },
  });

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
                  <h1>Statistical Analysics</h1>
                </div>
              </Col>
            </Row>

            <div className='card text-center'>
              <div className='card-header' style={{ color: `#0000` }}>
                <div className='past7daysHead'>
                  <div className='mx-2'>
                    <h5 className='mb-0 ttlPastSevenDayHead' style={{color:'black'}}>Number of Sales</h5>
                  </div>
                </div>
              </div>
              <div className='card-body'>
                <Bar data={data} options={options} id='tripsChart' />
              </div>
            </div>
            {auth.user.email == "muhammadhamza11@gmail.com" && (
              <div className='card text-center' style={{marginTop:'2%'}}>
              <div className='card-header' style={{ color: `#0000` }}>
                <div className='past7daysHead'>
                  <div className='mx-2'>
                    <h5 className='mb-0 ttlPastSevenDayHead' style={{color:'black'}}>Number of Seller</h5>
                  </div>
                </div>
              </div>
              <div className='card-body'>
                <Bar data={userdata1} options={options} id='tripsChart' />
              </div>
            </div>
  
            )}
         

         

          <div className='card text-center' style={{marginTop:'2%'}}>
            <div className='card-header' style={{ color: `#0000` }}>
              <div className='past7daysHead'>
                <div className='mx-2'>
                  <h5 className='mb-0 ttlPastSevenDayHead' style={{color:'black'}}>Number of Product</h5>
                </div>
              </div>
            </div>
            <div className='card-body'>
              <Bar data={productdata} options={options} id='tripsChart' />
            </div>
          </div>


          

          </Container>
        </Layout>
    
  );
};

