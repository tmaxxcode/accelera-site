import { motion, MotionConfig } from 'framer-motion';

type Props = { 'client:load'?: boolean };

export default function HeroCopy(_props: Props) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className="ih__copy"
        data-enter
        initial={{ opacity: 0, x: -14 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.48, ease: [0.23, 1, 0.32, 1] }}
      >
        <p className="ih__eyebrow"><span aria-hidden="true" /> Twin Cities trade businesses</p>
        <h1>
          Every missed call<br />
          <em>is a job at risk.</em>
        </h1>
        <p className="ih__description">
          We build your website, add easy booking, and help you catch the calls that come in after hours.
          You stay on the job. We make sure the next one gets booked.
        </p>
        <div className="ih__actions">
          <a className="ih__button ih__button--primary" href="#audit">Get a free missed-call audit</a>
          <a className="ih__button ih__button--secondary" href="#services">See how it works</a>
        </div>
        <p className="ih__note">A short call. Clear numbers. No pressure.</p>
      </motion.div>
    </MotionConfig>
  );
}
