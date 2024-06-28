import { css } from '@emotion/react';
import { DynamicIsland } from '@kangju2000/dynamic-island';
import { motion, useMotionValue, useTransform, MotionProps } from 'framer-motion';
import { CSSProperties } from 'react';
import { IconPhoneCircleFill, IconPhoneDownCircleFill } from '../assets/index';

export function PhoneCall() {
  const y = useMotionValue(0);
  const x = useMotionValue(0);

  const rotateX = useTransform(y, [-82, 82], [30, -30]);

  const transformTemplate: MotionProps['transformTemplate'] = ({ x: _x, y: _y, rotateX }) => {
    const y = typeof _y === 'number' ? _y : Number(_y?.replace('px', ''));
    const x = typeof _x === 'number' ? _x : Number(_x?.replace('px', ''));
    const template = [`scaleX(${1 + Math.abs(x / 3000)})`];

    if (y > 0) {
      template.push(`scaleY(${1 + y / 3000})`);
    } else {
      template.push(`rotateX(${rotateX})`);
    }
    return template.join(' ');
  };

  return (
    <DynamicIsland.Custom
      variantStyle={{ width: 366, height: 82, borderRadius: 50 }}
      drag
      dragElastic={0.5}
      dragMomentum={false}
      dragSnapToOrigin={true}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      transformTemplate={transformTemplate}
      style={{ x, y, rotateX, transformOrigin: 'top' } as CSSProperties}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)', rotateX: 45 }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', rotateX: 0, transition: { delay: 0.1 } }}
        exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)', rotateX: 45 }}
        css={phoneCallCss}
      >
        <img
          src="https://avatars.githubusercontent.com/u/23312485?v=4"
          alt="profile"
          width={45}
          height={45}
          style={{ borderRadius: '50%', backgroundColor: '#707070' }}
        />
        <motion.div style={{ flex: 1, whiteSpace: 'nowrap' }}>
          <p style={{ fontSize: '13px', color: '#707070' }}>mobile</p>
          <p style={{ fontSize: '16px' }}>Juhyeok Kang</p>
        </motion.div>
        <IconPhoneDownCircleFill style={{ cursor: 'pointer' }} />
        <IconPhoneCircleFill style={{ cursor: 'pointer' }} />
      </motion.div>
    </DynamicIsland.Custom>
  );
}

const phoneCallCss = css({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '14px',
});
