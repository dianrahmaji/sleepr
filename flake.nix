{
  description = "Sleepr project's flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, utils }:
    utils.lib.eachDefaultSystem (system:
      let
        pkgs = (import (nixpkgs) { inherit system; });
        gdk = pkgs.google-cloud-sdk.withExtraComponents (
          with pkgs.google-cloud-sdk.components; [
            gke-gcloud-auth-plugin
          ]
        );
      in {
        devShell = pkgs.mkShell {
	        buildInputs = with pkgs; [
            nest-cli
            nodejs_22
            pnpm
            gdk
          ];
        };
      }
    );
}
