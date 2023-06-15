import { GoogleSpreadsheet } from 'google-spreadsheet'
import { NextApiRequest, NextApiResponse } from 'next'

export default function corretordoano(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const getDoc = async () => {
    const doc = new GoogleSpreadsheet(
      '1gbNh-a2qtEDeWWQlkJjhaDkaI2r6qP9nz3JsyYxQzS8'
    )

    await doc.useServiceAccountAuth({
      client_email:
        'formulario-corretor@api-captacaoexterna.iam.gserviceaccount.com',
      private_key:
        '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC+Ofb5AoTqjXaX\nnIasI3aLHAuEY+mHZy3ktYjm1FBzTyIWApBarqC1h14JZOfMUZZaBfRZmn4ERUr7\nJh1CLwKE7j3Yo5S8diy6Lkc/AGxKaXtN9trcM/YDGShE5FfQn+ynSjDI6I1FSqm8\n5DCqHfgjxVhHnh8mrZFzRFmUM7fs6taeTu7WapKi9bozCywohwu+PR4ByVSLe2TG\nVeDNsSSdpNzAQa05TfpYkeJQZ01TSsGJtF+qNueuGxu64vBCoHXffGaVmwSna3Zp\nWDNjpvpY9NfRg1F8dVbOGc51yEerpyN0w8NxTiN8LiNCpm2qB/Hi0oEBmwX8NC72\nZk7cRHpRAgMBAAECggEAAkLv5tay9BNltih2GOiMhZuaHvMtoO6W9vW6CI18XdyS\nWgrigrN6BWJ0OZ4dm9oZ9JzGwoRxzFTzDuCNfz6OE/y9lzxdna51emqnre3wO6O8\no6kEQdMr0O5dAlGpIhmun3AEO7U5Dbp1IWHgmrsjurAjTCmq8uOkG6fTvU1umbZN\nOtkkY8rt2Vj8gg/42IRNeSDcbrQ8N4i+0p1cJ88BFQwvD/jF7eeQlNYKAtQQmuAu\nnVDlNCHbfbu/qr7YiPlnTSKx35Jll0GFMW6N9t3w6sXw7rEW9/KBuMl3BsBrucyn\noVpeD5wx6Ic74WR259FZWtoHFjAYMKirV2u6L1lhQQKBgQD2L77NJOZL5IKokzK8\nzVOL/2HvjYMbBd9xvCRdkFGjB1HFzD5LIcD6O7EIIRX/Kt0BqMIlS9dm30SRYSKr\nwfgsTdTclspmWLu5leTaMyJLNpD/y2/OE2NcyVbUDKODNJzbl2YOt1WuVtCHkYUm\nV017bvJN7NrcMJerezmCdUIyYQKBgQDFzyonjAliYF4BYpKvL3O9DBWbRdlpHh7u\n2vupN30IFH3ZqgPTjkqCjE6v7KyhLvJqFJx2vCkqcgTxcUfq3G6IO0gq6Kuuuhf0\nCsZjcTI989H4wVshe7mTaDePWQURR2Uniei4jbF6yBYM2BNr8tMMi31RsNiEkBAB\n1EcsPRgt8QKBgETyJitptB15B6aSYtlBX66LfTALn7YHtQYzPLP/YP2ZZStSAfgk\nodjysqemLHTj2jVGv+iWDuM+kANvAri7f/dYbM7CZDi5jQlykz8QpwANbhpVLSC3\niVJJCMomJ/zs1Skig3CHo7VJlukAthuAw7BX6AAu3zRfX3qk7fw9PqbBAoGAf+Ao\nET7PRkCkJOMTjprviFQKl8F1BiaJusHoFQGhG5sbrJ3jMV14P6Lyr3oiM2UFI5zF\ndWC4gA8LsQYZhvQPpJQmWE7nxeHZ4FMi42BnKXO41sYw4pl4Y5no6QuUYhI0i3X0\n83HuPUCiOJVrIMrustpuHmRj5Ha5UmVnyWqJehECgYEAx+dpUb67utzBITt2GlbA\nk2rFD/xRhrEvqV+/WMroQX2WUPWXjcMxiqrmus53b+QZVZvkkfnCJK62C9akinHs\n3RFnONPmLMWdh+d267k7gvzB5GDV8tqbwDRERYD5j4Al/kpUnKwWUNVw5O1qPcQ9\nucckK1mKWq0tWWx2B1eV+ew=\n-----END PRIVATE KEY-----\n'.replace(
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
        Imobiliaria: req.body.Imobiliaria,
        Proprietario: req.body.Proprietario,
        Corretor: req.body.Corretor,
        Creci: req.body.Creci,
        Whatsapp: req.body.Whatsapp,
        Email: req.body.Email,
        Aceita: req.body.Aceita,
        Data: new Date().toLocaleString('pt-br')
      })
      .then(() => {
        res.status(200).json({ status: 'OK' })
        console.log('OK')
      })
  })
}
