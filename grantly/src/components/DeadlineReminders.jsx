import { useMemo } from "react";
import { CalendarDays, Clock, AlertCircle } from "lucide-react";
import scholarships from "./data/scholarshipData.js";

export default function DeadlineReminders() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const items = useMemo(() => {
    return [...scholarships].sort(
      (a, b) => new Date(a.deadline) - new Date(b.deadline)
    );
  }, []);

  const getDaysLeft = (deadline) => {
    const date = new Date(deadline + "T00:00:00");
    return Math.ceil((date - today) / (1000 * 60 * 60 * 24));
  };

  return (
    <section className="deadline-page">
      <div className="deadline-heading">
        <span>STAY ON TRACK</span>
        <h1>Scholarship <strong>Deadlines</strong></h1>
        <p>Keep track of important dates and never miss an opportunity.</p>
      </div>

      <div className="deadline-summary">
        <CalendarDays size={30} />
        <div>
          <h2>{items.filter(item => getDaysLeft(item.deadline) >= 0).length}</h2>
          <p>Active scholarship deadlines</p>
        </div>
      </div>

      <div className="deadline-list">
        {items.map(item => {
          const days = getDaysLeft(item.deadline);
          const expired = days < 0;

          return (
            <article className="deadline-card" key={item.id}>
              <div className="deadline-icon">
                <CalendarDays size={25} />
              </div>

              <div className="deadline-info">
                <h3>{item.name}</h3>
                <p>{item.provider}</p>
                <small>Deadline: {item.deadline}</small>
              </div>

              <div className={`deadline-status ${expired ? "expired" : days <= 7 ? "urgent" : "upcoming"}`}>
                {expired ? (
                  <>
                    <AlertCircle size={17} />
                    Expired
                  </>
                ) : (
                  <>
                    <Clock size={17} />
                    {days === 0 ? "Due today" : `${days} days left`}
                  </>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <p className="deadline-note">
        Demo deadlines only. Verify actual application dates with the scholarship provider.
      </p>
    </section>
  );
}