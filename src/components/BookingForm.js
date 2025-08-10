import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const BookingSchema = Yup.object().shape({
  pickup: Yup.string().required("Pickup location required"),
  drop: Yup.string().required("Drop location required"),
  phone: Yup.string().required("Phone number required"),
});

export default function BookingForm() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Formik
      initialValues={{ pickup: "", drop: "", phone: "" }}
      validationSchema={BookingSchema}
      onSubmit={(values) => {
        console.log({ ...values, date: selectedDate });
        alert("Cab booked successfully!");
      }}
    >
      {() => (
        <Form>
          <label>Pickup:</label>
          <Field name="pickup" type="text" />
          <ErrorMessage name="pickup" component="div" />

          <label>Drop:</label>
          <Field name="drop" type="text" />
          <ErrorMessage name="drop" component="div" />

          <label>Phone:</label>
          <Field name="phone" type="text" />
          <ErrorMessage name="phone" component="div" />

          <label>Date & Time:</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            showTimeSelect
            dateFormat="Pp"
          />

          <button type="submit">Book Cab</button>
        </Form>
      )}
    </Formik>
  );
}
