import { FocusStyleManager } from "@blueprintjs/core";

import {
  Switch as BPSwitch,
  ISwitchProps as IBPSwitchProps
} from "@blueprintjs/core/lib/cjs/components/forms/controls";

import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from "@jupyterlab/application";

import { IThemeManager, ReactWidget } from "@jupyterlab/apputils";

import { ITopBar } from "jupyterlab-topbar";

import React, { useState, useEffect } from "react";

import "../style/index.css";

FocusStyleManager.onlyShowFocusOnTabs();

interface ISwitchProps extends IBPSwitchProps {
  title?: string;
  themeManager: IThemeManager;
  dark?: boolean;
}

const Switch = (props: ISwitchProps) => {
  const { themeManager, ...others } = props;

  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(!!props.dark);
  }, [props.dark]);

  const updateChecked = () => {
    const isDark = !themeManager.isLight(themeManager.theme);
    setDark(!!isDark);
  };

  useEffect(() => {
    let timeout = 0;
    if (!themeManager.theme) {
      // TODO: investigate why the themeManager is undefined
      timeout = setTimeout(() => {
        updateChecked();
      }, 500);
    } else {
      updateChecked();
    }
    themeManager.themeChanged.connect(updateChecked);

    return () => {
      clearTimeout(timeout);
      themeManager.themeChanged.disconnect(updateChecked);
    }
  });

  return (
    <BPSwitch
      {...others}
      checked={dark}
      className={props.className + " jp-Switch"}
    />
  );
}

/**
 * Initialization data for the jupyterlab-theme-toggle extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: "jupyterlab-theme-toggle:plugin",
  autoStart: true,
  requires: [IThemeManager],
  optional: [ITopBar],
  activate: (
    app: JupyterFrontEnd,
    themeManager: IThemeManager,
    topBar: ITopBar
  ) => {
    // TODO: make this configurable via the settings?
    const themes = [
      "JupyterLab Light", // Light Theme goes first
      "JupyterLab Dark"
    ];

    const onChange = async () => {
      const isLight = themeManager.isLight(themeManager.theme);
      await app.commands.execute("apputils:change-theme", {
        theme: themes[~~isLight]
      });
    };

    const { commands } = app;
    commands.addCommand('jupyterlab-theme-toggle:toggle', {
      label: "Toggle Theme",
      execute: onChange
    })

    if (topBar) {
      const widget = ReactWidget.create(
        <Switch
          themeManager={themeManager}
          onChange={onChange}
          innerLabel="light"
          innerLabelChecked="dark"
        />
      );
      topBar.addItem("theme-toggle", widget);
    }
  }
};

export default extension;
