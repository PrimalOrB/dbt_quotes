import React from "react";

const AddForm = () => {

  return (
    <section id="add-form-cont">
        <form id="add-form">
            <div>
                <label htmlFor="customer">Customer:</label>
                <input type="text" name="customer"  />
            </div>
            <div>
                <label htmlFor="jnum">J#:</label>
                <input type="text" name="jnum" />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <input type="text" name="description" />
            </div>
            <div>
                <label htmlFor="priority">Priority:</label>
                <input type="number" min="1" max="5" name="priority" />
            </div>
            <div>
                <label htmlFor="additional-notes">Additional Notes:</label>
                <textarea name="additional-notes" rows="5"  />
            </div>
            <div>
                <label htmlFor="pcsurl">PCS URL:</label>
                <input type="text" name="pcsurl" />
            </div>
            <div>
                <label htmlFor="crmurl">CRM Opportunity:</label>
                <input type="text" name="crmurl" />
            </div>
            <div>
                <label for="status">Assign a status:</label>
                <select name="status" id="status">
                        <option selected="true" disabled="disabled">Assign status</option>
                        <option value="finished">Finished</option>
                </select>
            </div>
            <div>
                <label htmlFor="podate">Purchase Order Received:</label>
                <input type="text" name="podate" />
            </div>
            <div>
                <label htmlFor="poqty">PO Quantity:</label>
                <input type="text" name="poqty" />
            </div>
            <button type="submit">Submit</button>
        </form>
    </section>
  );
};

export default AddForm;
