import { motion } from 'framer-motion'

interface VideoFrameProps {
  src?: string
  poster?: string
  placeholder?: boolean
  accentColor?: string
}

export function VideoFrame({ 
  src, 
  poster, 
  placeholder = false,
  accentColor = '#F97316'
}: VideoFrameProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="vf-container"
    >
      <div className="vf-frame">
        {/* Browser bar */}
        <div className="vf-bar">
          <div className="vf-dots">
            <span style={{ background: '#FF5F57' }} />
            <span style={{ background: '#FFBD2E' }} />
            <span style={{ background: '#28CA41' }} />
          </div>
          <div className="vf-url">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span>proyecto-demo.es</span>
          </div>
        </div>

        {/* Content */}
        <div className="vf-content">
          {placeholder ? (
            <div className="vf-placeholder">
              <div className="vf-play">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <span>Video demo próximamente</span>
            </div>
          ) : src ? (
            <video 
              src={src} 
              poster={poster}
              controls
              className="vf-video"
            />
          ) : poster ? (
            <img src={poster} alt="Project preview" className="vf-image" />
          ) : (
            <div className="vf-placeholder">
              <span>Sin contenido</span>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .vf-container {
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
        }

        .vf-frame {
          position: relative;
          background: rgba(15, 15, 25, 0.8);
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 
            0 25px 50px -12px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.05),
            0 0 80px -20px ${accentColor}30;
          backdrop-filter: blur(10px);
        }

        .vf-bar {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 16px;
          background: rgba(0, 0, 0, 0.4);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .vf-dots {
          display: flex;
          gap: 6px;
        }

        .vf-dots span {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .vf-url {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 6px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
        }

        .vf-url svg {
          color: #10B981;
        }

        .vf-content {
          aspect-ratio: 16 / 9;
          position: relative;
        }

        .vf-video,
        .vf-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .vf-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          background: linear-gradient(
            135deg,
            rgba(249, 115, 22, 0.1) 0%,
            rgba(251, 146, 60, 0.05) 50%,
            transparent 100%
          );
        }

        .vf-play {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, ${accentColor}, #FB923C);
          border-radius: 50%;
          color: white;
          box-shadow: 0 10px 40px ${accentColor}40;
          transition: transform 0.3s, box-shadow 0.3s;
          cursor: pointer;
        }

        .vf-play:hover {
          transform: scale(1.05);
          box-shadow: 0 15px 50px ${accentColor}50;
        }

        .vf-placeholder span {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        @media (max-width: 640px) {
          .vf-frame {
            border-radius: 12px;
          }
          .vf-bar {
            padding: 10px 12px;
          }
          .vf-dots span {
            width: 8px;
            height: 8px;
          }
          .vf-url {
            font-size: 11px;
            padding: 4px 8px;
          }
          .vf-play {
            width: 60px;
            height: 60px;
          }
          .vf-play svg {
            width: 32px;
            height: 32px;
          }
        }
      `}</style>
    </motion.div>
  )
}
