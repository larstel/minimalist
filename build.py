from pathlib import Path
from distutils.dir_util import copy_tree
import re, os, json, shutil

# import configuration json
f = open("../buildConfig.json")
build_config = json.load(f)

# create build folder
Path("./build").mkdir(exist_ok=True)
Path("./build/" + build_config["contentPath"]).mkdir(parents=True, exist_ok=True)

# copy scripts, static, styles
copy_tree("./scripts", "./build/scripts")
copy_tree("./styles", "./build/styles")
copy_tree("./static", "./build/static")

# copy custom css into build
shutil.copyfile("../custom.css", "./build/styles/custom.css")

# copy icon into build
shutil.copyfile("../" + build_config["iconPath"], "./build/static/icon.svg")


# insert every file content into template
with open("./template.html", 'r') as infile:
    content = infile.read()

    # go to folder configurated in build config
    for page_path in os.listdir("../" + build_config["contentPath"]):
        page_name = os.path.basename(page_path)

        # open page content
        with open("../" + build_config["contentPath"] + page_path, 'r') as page_infile:
            page_content = page_infile.read()
            content_copy = content

            # insert content language
            content_copy = re.sub('builder-content-language', build_config["contentLanguage"], content_copy)

            # insert title
            content_copy = re.sub('<builder-title></builder-title>', build_config["title"], content_copy)

            # insert header
            content_copy = re.sub('<builder-header></builder-header>', build_config["header"], content_copy)

            # insert sub header
            content_copy = re.sub('<builder-sub-header></builder-sub-header>', build_config["subHeader"], content_copy)

            # insert content into template
            content_copy = re.sub('<builder-content></builder-content>', f'{page_content}', content_copy)

            # insert navigation into template
            active_page_title = page_name.split(".")[0][3:].capitalize()
            content_copy = re.sub('<builder-chapter-name></builder-chapter-name>', active_page_title, content_copy)

            nav_html = ""
            
            file_list = os.listdir("../" + build_config["contentPath"])
            # german_chars = {ord('ae'):'ä', ord('ue'):'ü', ord('oe'):'ö'}
            # file_list.translate(german_chars)
            sortedList = sorted(file_list)
            for page in sortedList:
                page_name_of_list = os.path.basename(page)[3:]
                page_name_of_list_title = page_name_of_list.split(".")[0].capitalize()
                print(page_name.split("_")[1] + " / " + page_name_of_list)
                if page_name_of_list != page_name.split("_")[1]:
                    nav_html = nav_html + f'\n<a class="navigationElement" href="./{page_name_of_list}">{page_name_of_list_title}</a>'
                else:
                    nav_html = nav_html + f'\n<a class="navigationElement active" href="./{page_name}" id="_nav" onclick="onSideNavigationLinkClicked(_nav)">{active_page_title}</a>'

            content_copy = re.sub('<builder-nav></builder-nav>', f'{nav_html}', content_copy)

            # safe as new file
            with open(f'./build/{build_config["contentPath"]}/{page_name[3:]}', 'w') as outfile:
                outfile.write(content_copy)
