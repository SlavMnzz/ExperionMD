const { join } = require('path')

const { promises: fs } = require('fs')

const { promisify } = require('util')

const { google } = require('googleapis')

const EventEmitter = require('events')

// If modifying these scopes, delete token.json.

const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly']

// The file token.json stores the user's access and refresh tokens, and is

// created automatically when the authorization flow completes for the first

// time.

const TOKEN_PATH = join(__dirname, '..', 'token.json')

class GoogleAuth extends EventEmitter {

  constructor() {

    super()

  }

  async authorize(credentials) {

    let token

    const { client_secret, client_id, port } = credentials

    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, `http://localhost:${port}`)

    try {

      token = JSON.parse(await fs.readFile(TOKEN_PATH))

    } catch (e) {

      const authUrl = oAuth2Client.generateAuthUrl({

        access_type: 'offline',

        scope: SCOPES

      })

      this.emit('auth', authUrl)

      let code = await promisify(this.once).bind(this)('token')

      token = (await oAuth2Client.getToken(code)).tokens

      await fs.writeFile(TOKEN_PATH, JSON.stringify(token))

    } finally {

      oAuth2Client.setCredentials(token)

    }

    return oAuth2Client

  }

  token(code) {

    this.emit('token', code)

  }

}

class GoogleDrive extends GoogleAuth {

  constructor() {

    super()

    this.path = '/drive/api'

  }

  async getFolderID(path) {

    // Implementasi fungsi getFolderID di sini

  }

  async infoFile(path) {

    // Implementasi fungsi infoFile di sini

  }

  async folderList(path) {

    // Implementasi fungsi folderList di sini

  }

  async downloadFile(path) {

    // Implementasi fungsi downloadFile di sini

  }

  async uploadFile(path) {

    // Implementasi fungsi uploadFile di sini

  }

}

module.exports = {

  GoogleAuth,

  GoogleDrive

}