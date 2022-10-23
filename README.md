# sonagi
opennamu skin sonagi

# 베이스
[Liberty](https://librewiki.net/wiki/%EB%A6%AC%EB%B8%8C%EB%A0%88_%EC%9C%84%ED%82%A4:%ED%98%84%EA%B4%80) Base

# 유의사항
하단에 /License 링크를 위해서는 오픈나무 커스텀 페이지를 사용하여야합니다 
app.py 파일이 있는 폴더(오픈나무 폴더)에 custom.py를 생성하시고 아래와 같이 작성하셔야 정상적으로 작동됩니다.
```
from route.tool.func import *

def custom_run(conn, app):
    @app.route('/License')
    def License():
        with get_db_connect() as conn:
            curs = conn.cursor()

            curs.execute(db_change('select data from other where name = "markup"'))
            rep_data = curs.fetchall()
            
            return easy_minify(flask.render_template(skin_check(),
                imp = ['License', wiki_set(), wiki_custom(), wiki_css([0, 0])],
                menu = [['other', load_lang('return')]]
            ))```
