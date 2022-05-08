const { bot, getJson } = require('../lib')

bot(
	{
		pattern: 'time ?(.*)',
		fromMe: true,
		desc: 'find time by timeZone or name or shortcode',
		type: 'misc',
	},
	async (message, match) => {
		if (!match)
			return await message.sendMessage(
				'```Give me country name or code\nEx .time US\n.time United Arab Emirates\n.time America/new_york```'
			)
		const { status, result } = await getJson(
			`https://levanter.up.railway.app/time?code==${match}`
		)
		if (!status) return await message.sendMessage(`*Not found*`)
		let msg = ''
		result.forEach(
			(zone) =>
				(msg += `Name     : ${zone.name}\nTimeZone : ${zone.timeZone}\nTime     : ${zone.time}\n\n`)
		)
		return await message.sendMessage('```' + msg.trim() + '```')
	}
)