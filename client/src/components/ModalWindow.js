import React from 'react'

const ModalWindow = ({title, body, handleAction, confirmation}) => {
  return (
    <div className="modal fade" 
      id="exampleModal" 
      tabIndex="-1" 
      aria-labelledby="exampleModalLabel" 
      aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
            <button type="button" className="close" 
              data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {body}
          </div>
          <div className="modal-footer">
            <button type="button" 
              className="btn btn-secondary" 
              data-dismiss="modal">
              Close
            </button>
            <button 
              data-dismiss="modal"
              onClick = {handleAction}
              type="button" 
              className="btn btn-danger">{confirmation}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalWindow
