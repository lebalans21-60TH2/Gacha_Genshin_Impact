import React, { Component } from 'react'
import { Container, Row, Col, Badge, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Title from './details-components/title'
import Navbar from './details-components/navbar'
import ListView from './inventory-components/list-view'
import sadPaimon from '../assets/images/sad-paimon.png'
import IconView from './inventory-components/icon-view';
import currency from "currency-formatter";
export default class Inventory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 'listView',
      orderBy: 'rating',
      showOnly: 'all'
    }
    this.onChange = this.onChange.bind(this)
  }
  onChange({target: {name, value}}) {
    this.setState({[name]: value})
  }
  calculateAmountSpent(list) {
    let wishes = list.reduce((acc, curr) => acc + curr.quantity, 0)
    // return `${((336.6* 160) * wishes)} VND`
    return currency.format(`${((336.6* 160) * wishes)}`, {code:"VND"});
  }
  render() {
    const { backToHome, inventory } = this.props
    const { orderBy, view, showOnly } = this.state
    const inventoryList = Object.values(inventory)
    const sorting = {
      rating: (item1, item2) => item2.rating - item1.rating,
      quantity: (item1, item2) => item2.quantity - item1.quantity,
      name: (item1, item2) => item1.name.localeCompare(item2.name),
    }
    const showFilter = {
      all: item => item,
      characters: item => item.type === 'character',
      weapons: item => item.type === 'weapon',
      fiveStars: item => item.rating === 5,
      fourStars: item => item.rating === 4,
      threeStars: item => item.rating === 3
    }
    // est cost per primogen, 1600 gems per 10 wishes
    const amountSpent = this.calculateAmountSpent(inventoryList)
    return (
      <>
        <Navbar
          backToHome={backToHome}
        />
        <div className="details pt-5 min-vh-100">
          <Container>
            <Title>
              <h1>| Lịch sử </h1>
            </Title>
            <Form
            onSubmit={e => e.preventDefault()}
            >
              <Row>
                <Col xs="6" sm="3">
                  <FormGroup>
                    <Label for="orderBy">Sắp xếp theotheo</Label>
                    <Input
                      type="select"
                      name="orderBy"
                      id="orderBy"
                      onChange={this.onChange}
                    >
                      <option value="rating">Sao</option>
                      <option value="name">Tên</option>
                      <option value="quantity">Số lượng</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col xs="6" sm="3">
                  <FormGroup>
                    <Label for="showOnly">Chỉ hiển thị</Label>
                    <Input
                      type="select"
                      name="showOnly"
                      id="showOnly"
                      onChange={this.onChange}
                    >
                      <option value="all">Tất cả</option>
                      <option value="characters">Nhân vật</option>
                      <option value="weapons">Vũ khí</option>
                      <option value="fiveStars">5 Sao</option>
                      <option value="fourStars">4 Sao</option>
                      <option value="threeStars">3 Sao</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col xs="6" sm="3">
                  <FormGroup>
                    <Label for="view">Xem</Label>
                    <Input
                    type="select"
                    name="view"
                    id="view"
                    onChange={this.onChange}
                    >
                      <option value="listView">Danh sách</option>
                      <option value="iconView">Icons</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col xs="6" sm="3">
                  <FormGroup>
                    <Label>Tổng thiệt hại</Label>
                      <Badge
                        color="warning"
                        className="amount-spent-badge"
                      >
                        {amountSpent}
                      </Badge>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
            <Row className='justify-content-center'>
              {
                inventoryList.length
                ? (
                  inventoryList
                  .sort(sorting[orderBy])
                  .filter(showFilter[showOnly])
                  .map(item => (
                    view === 'listView'
                    ? (
                        <ListView
                          key={item.name}
                          item={item}
                        />
                    )
                    : (
                      <IconView
                        key={item.name}
                        item={item}
                      />
                    )
                  ))
                )
                : (
                  <Col xs='12' className="card p-4 d-flex justify-content-center align-items-center">
                    <h4 className="text-center mb-5">No Items :(</h4>
                    <img src={sadPaimon} alt="Sad paimon" className="mw-50"/>
                  </Col>
                )
              }
            </Row>
          </Container>
        </div>
      </>
    )
  }
}
