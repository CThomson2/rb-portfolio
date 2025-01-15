import React from "react";

const OrderForm = () => {
  return (
    <div className="container-contact100">
      <div className="wrap-contact100">
        <form className="contact100-form validate-form">
          <div>
            <span className="contact100-form-title">Contact Us</span>

            <div
              className="wrap-input100 validate-input bg1"
              data-validate="Please Type Your Name"
            >
              <span className="label-input100">FULL NAME *</span>
              <input
                className="input100"
                type="text"
                name="name"
                placeholder="Enter Your Name"
              />
            </div>

            <div
              className="wrap-input100 validate-input bg1 rs1-wrap-input100"
              data-validate="Enter Your Email (e@a.x)"
            >
              <span className="label-input100">Email *</span>
              <input
                className="input100"
                type="text"
                name="email"
                placeholder="Enter Your Email "
              />
            </div>

            <div className="wrap-input100 bg1 rs1-wrap-input100">
              <span className="label-input100">Phone</span>
              <input
                className="input100"
                type="text"
                name="phone"
                placeholder="Enter Number Phone"
              />
            </div>

            <div className="wrap-input100 input100-select bg1">
              <span className="label-input100">Needed Services *</span>
              <div>
                <select className="js-select2" name="service">
                  <option>Please chooses</option>
                  <option>eCommerce Bussiness</option>
                  <option>UI/UX Design</option>
                  <option>Online Services</option>
                </select>
                <div className="dropDownSelect2"></div>
              </div>
            </div>

            <div className="w-full dis-none js-show-service">
              <div className="wrap-contact100-form-radio">
                <span className="label-input100">
                  What type of products do you sell?
                </span>
              </div>

              <div className="contact100-form-radio m-t-15">
                <input
                  className="input-radio100"
                  id="radio1"
                  type="radio"
                  name="type-product"
                  value="physical"
                  checked={true}
                />
                <label className="label-radio100" htmlFor="radio1">
                  Phycical Products
                </label>
              </div>

              <div className="contact100-form-radio">
                <input
                  className="input-radio100"
                  id="radio2"
                  type="radio"
                  name="type-product"
                  value="digital"
                />
                <label className="label-radio100" htmlFor="radio2">
                  Digital Products
                </label>
              </div>

              <div className="contact100-form-radio">
                <input
                  className="input-radio100"
                  id="radio3"
                  type="radio"
                  name="type-product"
                  value="service"
                />
                <label className="label-radio100" htmlFor="radio3">
                  Services Consulting
                </label>
              </div>
            </div>

            <div className="wrap-contact100-form-range">
              <span className="label-input100">Budget *</span>

              <div className="contact100-form-range-value">
                $<span id="value-lower">610</span> - $
                <span id="value-upper">980</span>
                <input type="text" name="from-value" />
                <input type="text" name="to-value" />
              </div>

              <div className="contact100-form-range-bar">
                <div id="filter-bar"></div>
              </div>
            </div>
          </div>

          <div
            className="wrap-input100 validate-input bg0 rs1-alert-validate"
            data-validate="Please Type Your Message"
          >
            <span className="label-input100">Message</span>
            <textarea
              className="input100"
              name="message"
              placeholder="Your message here..."
            ></textarea>
          </div>

          <div className="container-contact100-form-btn">
            <button className="contact100-form-btn">
              <span>
                Submit
                <i
                  className="fa fa-long-arrow-right m-l-7"
                  aria-hidden="true"
                ></i>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
