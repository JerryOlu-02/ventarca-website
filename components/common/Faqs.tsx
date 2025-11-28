"use client";

import "@/styles/components/common/Faqs.scss";
import Button from "./Button";

import FaqICon from "@/public/icon/faq-icon.svg";
import { useEffect, useState } from "react";

interface Faqs {
  question: string;
  answer: string;
  index?: number;
}

const faqs: Faqs[] = [
  {
    question:
      "Dictumst euismod erat euismod sit est sit magna consequat pretium nunc etiam vitae?",
    answer:
      "In eget pulvinar purus sit nunc. Porta ut proin consectetur nibh. Purus massa fusce elit semper eu hendrerit amet id. Venenatis tortor odio urna odio pretium semper porttitor nunc viverra.",
  },
  {
    question:
      "Dictumst euismod erat euismod sit est sit magna consequat pretium nunc etiam vitae?",
    answer:
      "In eget pulvinar purus sit nunc. Porta ut proin consectetur nibh. Purus massa fusce elit semper eu hendrerit amet id. Venenatis tortor odio urna odio pretium semper porttitor nunc viverra.",
  },
  {
    question:
      "Dictumst euismod erat euismod sit est sit magna consequat pretium nunc etiam vitae?",
    answer:
      "In eget pulvinar purus sit nunc. Porta ut proin consectetur nibh. Purus massa fusce elit semper eu hendrerit amet id. Venenatis tortor odio urna odio pretium semper porttitor nunc viverra.",
  },
  {
    question:
      "Dictumst euismod erat euismod sit est sit magna consequat pretium nunc etiam vitae?",
    answer:
      "In eget pulvinar purus sit nunc. Porta ut proin consectetur nibh. Purus massa fusce elit semper eu hendrerit amet id. Venenatis tortor odio urna odio pretium semper porttitor nunc viverra.",
  },
  {
    question:
      "Dictumst euismod erat euismod sit est sit magna consequat pretium nunc etiam vitae?",
    answer:
      "In eget pulvinar purus sit nunc. Porta ut proin consectetur nibh. Purus massa fusce elit semper eu hendrerit amet id. Venenatis tortor odio urna odio pretium semper porttitor nunc viverra.",
  },
];

export default function Faqs() {
  return (
    <section className="section section_faqs">
      <div className="page_width faqs">
        <aside className="faqs_desc">
          <h2>Frequently Asked Questions</h2>

          <div className="faqs_desc_text">
            <div>
              <h4>Still have questions?</h4>
              <p>
                Sed morbi at fames vitae quis donec. Mi pellentesque amet
                integer aliquet habitant. Et pellentesque vel urna id
                pellentesque a sapien posuere lobortis.
              </p>
            </div>

            <Button className="btn btn-primary btn-small">Send Email</Button>
          </div>
        </aside>

        <aside className="faq_list">
          {faqs.map((faq, i) => (
            <FaqItem
              key={i}
              answer={faq.answer}
              question={faq.question}
              index={i}
            />
          ))}

          <div className="faqs_desc_text mobile">
            <div>
              <h4>Still have questions?</h4>
              <p>
                Sed morbi at fames vitae quis donec. Mi pellentesque amet
                integer aliquet habitant. Et pellentesque vel urna id
                pellentesque a sapien posuere lobortis.
              </p>
            </div>

            <Button className="btn btn-primary btn-small">Send Email</Button>
          </div>
        </aside>
      </div>
    </section>
  );
}

function FaqItem({ question, answer, index }: Faqs) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (index === 0) {
      setIsOpen(true);
    }
  }, []);

  return (
    <div className={`faq_item ${isOpen && "open"}`}>
      <div className={`faq_item_header ${isOpen && "open"}`}>
        <p>{question}</p>

        <div
          onClick={() =>
            setIsOpen((previouslyOpen) =>
              previouslyOpen ? false : !previouslyOpen
            )
          }
        >
          <FaqICon />
        </div>
      </div>

      <p className={`faq_item_desc ${isOpen && "open"}`}>{answer}</p>
    </div>
  );
}
