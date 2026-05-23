import { useState, useRef } from 'react'
import { t } from '../i18n/translations'

// MyMemory 무료 번역 API 사용 (하루 5,000자 제한)
async function translateText(text, targetLang) {
  const langMap = { ko:'ko', en:'en', zh:'zh-CN', vi:'vi', fil:'tl', mn:'mn', ru:'ru', ja:'ja' }
  const lang = langMap[targetLang] || 'en'
  if (targetLang === 'ko') return text

  const MAX_CHUNK = 400
  const chunks = []
  for (let i = 0; i < text.length; i += MAX_CHUNK) {
    chunks.push(text.slice(i, i + MAX_CHUNK))
  }

  const results = []
  for (const chunk of chunks) {
    try {
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(chunk)}&langpair=ko|${lang}`
      )
      const data = await res.json()
      results.push(data.responseData?.translatedText || chunk)
      await new Promise(r => setTimeout(r, 100))
    } catch {
      results.push(chunk)
    }
  }
  return results.join('\n')
}

const SAMPLE_TEXT = `2026학년도 1학기 학부모 안내 가정통신문

안녕하세요, 학부모님.

저희 학교는 모든 학생들의 건강하고 행복한 학교생활을 위해 최선을 다하고 있습니다.

■ 2026학년도 1학기 주요 행사 안내

1. 현장체험학습
  - 일시: 2026년 6월 10일(수)
  - 장소: 서울 어린이대공원
  - 준비물: 도시락, 물, 편한 복장

2. 학부모 상담 주간
  - 기간: 2026년 6월 16일(화) ~ 20일(토)
  - 방법: 담임교사와 개별 예약 후 진행
  - 신청: 학교 홈페이지 또는 담임교사 연락

3. 학기말 성적통지
  - 발송일: 2026년 7월 10일(금)
  - 방법: 가정통신문 발송

■ 건강 안전 안내
- 독감 예방접종을 권장합니다
- 아픈 경우 등교를 자제해 주세요
- 학교 내 마스크 착용은 자유입니다

■ 기타 안내사항
- 학교폭력 신고: 117
- 학교 전화: 02-1234-5678
- 학교 홈페이지: www.school.go.kr

감사합니다.

2026년 5월
담임교사 드림`

export default function NewsletterTab({ language }) {
  const tr = t[language]
  const [pdfUrl, setPdfUrl] = useState(null)
  const [pdfName, setPdfName] = useState('')
  const [isSample, setIsSample] = useState(false)
  const [translatedText, setTranslatedText] = useState('')
  const [isTranslating, setIsTranslating] = useState(false)
  const [view, setView] = useState('original') // 'original' | 'translation'
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef()

  const handleFile = (file) => {
    if (!file || file.type !== 'application/pdf') return
    const url = URL.createObjectURL(file)
    setPdfUrl(url)
    setPdfName(file.name)
    setTranslatedText('')
    setIsSample(false)
    setView('original')
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFile(e.dataTransfer.files[0])
  }

  const loadSample = async () => {
    setIsSample(true)
    setPdfUrl(null)
    setPdfName('sample_newsletter.pdf')
    setTranslatedText('')
    setView('original')
  }

  const handleTranslate = async () => {
    if (!isSample && !pdfUrl) return
    setIsTranslating(true)
    setView('translation')
    try {
      const translated = await translateText(SAMPLE_TEXT, language)
      setTranslatedText(translated)
    } catch (e) {
      setTranslatedText('번역 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.')
    } finally {
      setIsTranslating(false)
    }
  }

  const hasFile = pdfUrl || isSample

  return (
    <div className="newsletter-container">
      {!hasFile && (
        <label
          className={`upload-zone ${dragOver ? 'dragover' : ''}`}
          onDragOver={e => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".pdf"
            ref={fileRef}
            onChange={e => handleFile(e.target.files[0])}
          />
          <span className="upload-icon">📄</span>
          <p className="upload-title">{tr.uploadPdf}</p>
          <p className="upload-desc">{tr.uploadDesc}</p>
          <button
            type="button"
            className="sample-btn"
            onClick={e => { e.preventDefault(); loadSample() }}
          >
            📋 {tr.sampleNewsletter}
          </button>
        </label>
      )}

      {hasFile && (
        <>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12, flexWrap:'wrap' }}>
            <button className="sample-btn" onClick={() => { setPdfUrl(null); setIsSample(false); setTranslatedText('') }}>
              ✕ {pdfName}
            </button>
            <button className="sample-btn" onClick={() => { setPdfUrl(null); setIsSample(false); setTranslatedText('') }}
              style={{ marginLeft:'auto' }}>
              + {tr.uploadPdf}
            </button>
          </div>

          <div className="newsletter-viewer">
            {/* 원본 PDF 패널 */}
            <div className="viewer-panel">
              <div className="viewer-panel-header">
                <span>📄 {tr.pdfPreview}</span>
                {language !== 'ko' && (
                  <button
                    className="translate-btn"
                    onClick={handleTranslate}
                    disabled={isTranslating}
                  >
                    {isTranslating ? tr.translating : tr.translateBtn}
                  </button>
                )}
              </div>
              <div style={{ flex:1, padding:'0', position:'relative' }}>
                {pdfUrl ? (
                  <iframe
                    src={pdfUrl}
                    className="pdf-frame"
                    title="PDF Preview"
                  />
                ) : (
                  <div style={{ padding:'20px', flex:1, overflow:'auto', background:'#fafafa', minHeight:560, fontFamily:'monospace', fontSize:13, lineHeight:1.8, whiteSpace:'pre-wrap', color:'#334155' }}>
                    {SAMPLE_TEXT}
                  </div>
                )}
              </div>
            </div>

            {/* 번역 패널 */}
            <div className="viewer-panel">
              <div className="viewer-panel-header" style={{ background:'#065F46' }}>
                <span>🌐 {tr.translationPanel}</span>
                {translatedText && (
                  <span style={{ fontSize:11, opacity:0.8 }}>✓ {tr.translationReady}</span>
                )}
              </div>
              <div className="translation-body">
                {isTranslating ? (
                  <div className="translation-placeholder">
                    <div className="translation-loading">
                      <span className="spinner" />
                      <span>{tr.translating}</span>
                    </div>
                    <p style={{ fontSize:12, color:'var(--text-muted)', marginTop:8 }}>
                      {tr.translationNote}
                    </p>
                  </div>
                ) : translatedText ? (
                  <div style={{ whiteSpace:'pre-wrap', lineHeight:1.9, fontSize:14 }}>
                    {translatedText}
                  </div>
                ) : (
                  <div className="translation-placeholder">
                    <span className="icon">🌐</span>
                    <p style={{ fontWeight:600, color:'var(--text)' }}>{tr.viewTranslation}</p>
                    <p style={{ fontSize:13 }}>{tr.noTranslation}</p>
                    {language === 'ko' && (
                      <p style={{ fontSize:12, marginTop:8, color:'#DC2626' }}>
                        ※ 다른 언어를 선택하면 번역 기능이 활성화됩니다
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
