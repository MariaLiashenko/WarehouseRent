import "./datatable.scss"
import { DataGrid } from "@mui/x-data-grid"
import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import useFetch from "../../hooks/useFetch"
import { useEffect } from "react"
import axios from "axios"
import { Card, Row, Col, Button } from "react-bootstrap"

const Datatable = ({ columns }) => {
  const location = useLocation()
  const path = location.pathname.split("/")[1]
  const [list, setList] = useState([])
  const { data, loading, error } = useFetch(`/${path}`)

  useEffect(() => {
    setList(data)
  }, [data])

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`)
      setList(list.filter((item) => item._id !== id))
    } catch (err) {}
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        )
      },
    },
  ]

  return (
    <div className="datatable">
      {list.length == 0 ? (
        "loading"
      ) : (
        <>
          <div className="datatableTitle">
            {path}
            <Link to={`/${path}/new`} className="link">
              Add New
            </Link>
          </div>
          {path === "warehouses" ? (
            <Row>
              {list.map((item, index) => (
                <Col key={index} lg={4} md={6} sm={12}>
                  <Card style={{ marginBottom: "1rem" }}>
                    <Card.Body>
                      <Card.Title>ID: {item._id}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        Name (English): {item.en.name}
                      </Card.Subtitle>
                      <Card.Text>City (English): {item.en.city}</Card.Text>
                      <Card.Text>
                        Description (English): {item.en.description}
                      </Card.Text>
                      <Card.Text>Name (Ukrainian): {item.ukr.name}</Card.Text>
                      <Card.Text>City (Ukrainian): {item.ukr.city}</Card.Text>
                      <Card.Text>
                        Description (Ukrainian): {item.ukr.description}
                      </Card.Text>
                      <Card.Text>
                        Electricity: {item.electricity ? "Yes" : "No"}
                      </Card.Text>
                      <Card.Text>
                        Plumbing: {item.plumbing ? "Yes" : "No"}
                      </Card.Text>
                      <Card.Text>PriceMonth: {item.priceMonth}</Card.Text>
                      <Card.Text>PriceYear: {item.priceYear}</Card.Text>
                      <Button
                        className="btn"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </Button>
                      <Link
                        to={`/warehouses/${item._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Button className="btn">View</Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <DataGrid
              className="datagrid"
              rows={list}
              columns={columns.concat(actionColumn)}
              pageSize={9}
              rowsPerPageOptions={[9]}
              checkboxSelection
              getRowId={(row) => row._id}
            />
          )}
        </>
      )}
    </div>
  )
}

export default Datatable
