import Header from "./Header";
import React, { useState } from "react";
import { useLocation,useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";

import VenueDataService from "../services/VenueDataService";

import { useParams } from "react-router-dom"; 
function AddComment() {
  const [showModal, setShowModal] = useState(false);
  let location = useLocation();
  const { id } = useParams();

  const dispatch =  useDispatch();
  const navigate = useNavigate();
  const venue = useSelector((state) => state.data);
  const onSubmit = (evt) => {
    evt.preventDefault();
    
    if (
      evt.target.elements.author.value &&
      evt.target.elements.text.value &&
      evt.target.elements.rating.value
    ) {
      let newComment = {
        author: evt.target.elements.author.value,
        text: evt.target.elements.text.value,
        rating: evt.target.elements.rating.value,
      };
  
      VenueDataService.addComment(id, newComment)
        .then(() => {
          dispatch({ type: "ADD_COMMENT_SUCCESS" });
         setShowModal(true);
          //navigate("/venue/" + id);
        })
        .catch(() => {
          dispatch({ type: "ADD_COMMENT_FAILURE" });
        });
    }
  };

  const handleModalClose=()=>{
    setShowModal(false);
    navigate(`/venue/${id}`);
  }
  
    return (
      <>
        <Header headerText={location.state.name} motto=" mekanına yorum yap" />
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <form
              className="form-horizontal"
              id="yorumEkle"
              onSubmit={(evt) => onSubmit(evt)}
            >
               <div className="form-group">
                <label className="col-sm-2 control-label">İsim:</label>
                <div className="col-sm-10">
                  <input
                    className="review form-control"
                    name="author"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-xs-10 col-sm-2 control-label">
                  Puan:
                </label>
                <div className="col-xs-12 col-sm-2">
                  <select
                    className="form-control input-sm"
                    id="rating"
                    name="rating"
                  >
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 control-label">Yorum:</label>
                <div className="col-sm-10">
                  <textarea
                    className="review form-control"
                    name="text"
                    rows={5}
                  />
                </div>
              </div>
              <button className="btn btn-default pull-right">Yorum Ekle</button>
            </form>
          </div>
        </div>

        <Modal show={showModal} onClose={handleModalClose}
        title="tebrikler"
        message="yorumunuz yayımlandı"/>
      </>
    );
}
export default AddComment;
