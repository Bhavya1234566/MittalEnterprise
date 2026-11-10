import { useState } from "react";
import "./FAQs.css";

const faqs = [
  {
    question: "Do you deliver across India?",
    answer:
      "Yes, we provide fast and secure delivery across India.",
  },
  {
    question: "Are all products genuine?",
    answer:
      "Yes. We supply premium quality genuine tractor spare parts.",
  },
  {
    question: "Can I place bulk orders?",
    answer:
      "Absolutely! Dealers and wholesalers can contact us for bulk pricing.",
  },
  {
    question: "Which payment methods do you accept?",
    answer:
      "We accept UPI, Bank Transfer and other secure payment options.",
  },
];

export default function FAQ() {

const [open,setOpen]=useState(null);

return(

<section className="faq">

<div className="container">

<h2>Frequently Asked Questions</h2>

{faqs.map((faq,index)=>(

<div className="faq-item" key={index}>

<div
className="faq-question"
onClick={()=>setOpen(open===index?null:index)}
>

<h3>{faq.question}</h3>

<span>{open===index?"−":"+"}</span>

</div>

{open===index && (

<p>{faq.answer}</p>

)}

</div>

))}

</div>

</section>

)

}