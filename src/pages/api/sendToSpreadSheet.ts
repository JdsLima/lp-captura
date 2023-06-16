import { GoogleSpreadsheet } from 'google-spreadsheet'
import { NextApiRequest, NextApiResponse } from 'next'

export default function sendToSpreadSheet(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const getDoc = async () => {
    const doc = new GoogleSpreadsheet(
      '1W4oh0U3ENO2m1JaTXWmINqjRp7rEAPZF_zf0-MPTMOs'
    )

    await doc.useServiceAccountAuth({
      client_email:
        'integracao-google-planilhas@unique-linker-390003.iam.gserviceaccount.com',
      private_key:
        '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDUsXYM46HpMhXF\n5nqJuO2VlM7R61EvQDCc5rAD78fsNr66JiJbr1REhxpcKugvLB5Ra0YZVxXhGgwa\naGhrhxbjvSjSJxMoxVU5pdewF96tgsBBeQb+rT8PZ2ncmW1qIK0Q1nWaGmH3QLZ/\nz5CHJwlR8+446NuTfzjH64MxM/9PaDMf2fEG/G6P2L/lWo5eUfiax3hjWUGhhhUt\nf/SQYwSqkaVO6iW2ZlaZpFuy3b2F+sEJsihxNBuU4djtaRFErtxVrlFKs41qJbbC\nh/VGYdn4F3/+3tgGeZ8LH+u19ySrU1j9pvW+WDb0dq7x8kcqyVdSM1rRODG+fir0\n066j9U8BAgMBAAECggEATso8jnLG2GGG4kxKaXlZfbdl1CqlZOkU+RKV8qdhOpZf\nGgslYCx3fXlE4Q69+zePNZ8VFS8G+l/RSvkRcX/WEWBR3mO+O7S6KQRP/boh8cnF\nWZuxZSedfCHVe/RULWPUaK/hWchbMSJGWNt10TM7RyIjRe6w5JdU2+5ZJ6F4+xtT\nsJ4+ba6PcHL2qdNxCWlW0/VW3rQY5BTELSk9RIH1nbLB8FtLwpj5/9ncfyMOrsPU\ncICF9W1J32RpMyf4Flnn1mRSIeXpdOwwWODUIi+w2osCMA6lH+RKCDN55Dp3O+Wi\nU7xs0n50b/jmHJjJMroRJ0yGkqNXSI7rMs08E3n4VwKBgQD7qlZbZdwS7pLTsE9B\nTt6E9Impge/3LuERy8OvShKKGWXCrzW6KR+Tt3MB+VFi2fYcDxqYwN/L3NDgzSXJ\n5QNDY7aAcm1+dKfe3PIrTLBtYaq6viStiyPRL0GrVhpSOHpF1Kh5Ec7KJ8uQv8vS\nFuZaXBZmddqWqM3GIWFRmjHJPwKBgQDYW0je8UhKItptqs/fTpQRw8Eg/0uh+lUq\na0+aPdmNydnLAJ54Uppb5Ra6A56GUYnxk+GgwuFVaUiUzJKatfEziIN/GYN2RddK\no4PiRTH9k0oOBtVDlqLshehHTjOfG5Nl6U/NW6EdTweQFZ4CsYXDaNqU/Q9FDR0x\nGgdXQeSXvwKBgC/KF94BSLo7nZwfRd2T+YNr4FxU9VmOCGVVuVInEcAxtHY0yVIR\njxKA6pD8ZC0OUMLhR16seZL/2pZlvoBJQcZhP/3CPPKfemVCtaXtSS9sNXyCsPpX\nirSlcaX0ksj8OpPaHyfmbstKpUhWc4DwokuUYxiP1rN3WKQAILfbPQsHAoGAHKKo\nWGmS6c0HH/C1ppad3mQMUbO4bO3XC9A8Luv0uWF34/hnAQHd0D/X7DLCboCoQ0MR\nX9erP0S6CIey96sRC4ML9GyKC8NepVBTCkWiQi+WY5jf7Rwo4Ckw/w8IogxiS+C/\nYSy5fEmTdKyHx097pstf8swzky4TKQaK5i+gc70CgYEAp+zw/3+Fe9EfzMxTE0RL\n6HnHeeMiV9xzII3W+EFtEUnvqHGIySNDrteO+g9NCOl+X22so+WCo7MBD2lE0yTl\nNrYOBaecAWWCUny7fvhlQTs1m7Z26H6ysIDzDgyA+YcYJ/Xw1jW72GImsA01Ao21\nyPMPhltt+uIW57KcOu83oqs=\n-----END PRIVATE KEY-----\n'.replace(
          /\\n/g,
          '\n'
        )
    })
    await doc.loadInfo()
    return doc
  }

  getDoc().then((doc) => {
    const sheet = doc.sheetsByIndex[0]
    sheet
      .addRow({
        Nome: req.body.Nome,
        Email: req.body.Email,
        WhatsApp: req.body.WhatsApp,
        Telefone: req.body.Telefone,
        EnderecoDeObra: req.body.EnderecoDeObra,
        ondeConheceu: req.body.ondeConheceu,
        Data: new Date().toLocaleString('pt-br')
      })
      .then(() => {
        res.status(200).json({ status: 'OK' })
        console.log('OK')
      })
  })
}
